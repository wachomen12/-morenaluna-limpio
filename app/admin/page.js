"use client";
import React, { useState } from 'react';
import { categorias } from "@/data/productos";
import { supabase } from '../../lib/supabaseClient';

export default function Admin() {
  // ...existing code...
  const [showPass, setShowPass] = useState(false);
  const [showEditPass, setShowEditPass] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  // Estado para usuario y contraseña guardados
  const [adminUser, setAdminUser] = useState(() => typeof window !== 'undefined' && localStorage.getItem('adminUser') ? localStorage.getItem('adminUser') : 'admin');
  const [adminPass, setAdminPass] = useState(() => typeof window !== 'undefined' && localStorage.getItem('adminPass') ? localStorage.getItem('adminPass') : 'morena2024');
  const [showEditUser, setShowEditUser] = useState(false);
  const [newUser, setNewUser] = useState("");
  const [newPass, setNewPass] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const [nombreProducto, setNombreProducto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [editandoProducto, setEditandoProducto] = useState(null);
  const [editForm, setEditForm] = useState({ nombre: '', categoria: '', precio: '', descripcion: '', imagen: '' });
  // Manejar cambios en el formulario de edición
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // Manejar cambio de imagen en edición
  const handleEditImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, imagen: reader.result, nuevaImagen: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Abrir formulario de edición con datos actuales
  const handleEdit = (producto) => {
    setEditandoProducto(producto.id);
    setEditForm({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio,
      descripcion: producto.descripcion || '',
      imagen: producto.imagen,
      nuevaImagen: null
    });
  };

  // Guardar cambios en Supabase
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    let imagenUrl = editForm.imagen;
    // Si hay nueva imagen, subirla a ImgBB
    if (editForm.nuevaImagen) {
      const formData = new FormData();
      formData.append('image', editForm.nuevaImagen);
      formData.append('key', IMGBB_API_KEY);
      const res = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        imagenUrl = data.data.url;
      }
    }
    // Actualizar en Supabase
    const { error } = await supabase
      .from('productos')
      .update({
        nombre: editForm.nombre,
        categoria: editForm.categoria,
        precio: parseFloat(editForm.precio),
        descripcion: editForm.descripcion,
        imagen: imagenUrl
      })
      .eq('id', editandoProducto);
    if (!error) {
      setProductos(productos.map(p => p.id === editandoProducto ? { ...p, ...editForm, imagen: imagenUrl } : p));
      setEditandoProducto(null);
      setUploadMsg('Producto actualizado');
      setTimeout(() => setUploadMsg(''), 2000);
    } else {
      setUploadMsg('Error al actualizar');
    }
  };

  const handleCancelEdit = () => {
    setEditandoProducto(null);
    setEditForm({ nombre: '', categoria: '', precio: '', descripcion: '', imagen: '', nuevaImagen: null });
  };

  // Cargar productos en tiempo real al iniciar sesión
  React.useEffect(() => {
    if (isLogged && isLogged !== 'upload') {
      setLoadingProductos(true);
      supabase
        .from('productos')
        .select('*')
        .order('creado', { ascending: false })
        .then(({ data, error }) => {
          if (error) {
            setProductos([]);
            setLoadingProductos(false);
          } else {
            setProductos(data || []);
            setLoadingProductos(false);
          }
        });
    }
  }, [isLogged]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === adminUser && pass === adminPass) {
      setIsLogged(true);
      setError("");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    if (!newUser.trim() || !newPass.trim()) {
      setUserMsg("Completa ambos campos");
      return;
    }
    // Validaciones de contraseña
    if (newPass.length < 6) {
      setUserMsg("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (!/[A-Z]/.test(newPass)) {
      setUserMsg("La contraseña debe tener al menos una mayúscula");
      return;
    }
    if (!/[a-z]/.test(newPass)) {
      setUserMsg("La contraseña debe tener al menos una minúscula");
      return;
    }
    if (!/[0-9]/.test(newPass)) {
      setUserMsg("La contraseña debe tener al menos un número");
      return;
    }
    setAdminUser(newUser);
    setAdminPass(newPass);
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminUser', newUser);
      localStorage.setItem('adminPass', newPass);
    }
    setUserMsg("Usuario y contraseña actualizados. Saliendo...");
    setTimeout(() => {
      setUserMsg("");
      setShowEditUser(false);
      setIsLogged(false); // Cerrar sesión y volver al login
      setUser("");
      setPass("");
    }, 1800);
  };

  // ImgBB - Hosting de imágenes gratuito
  // Obtén tu API key gratis en: https://api.imgbb.com/
  const IMGBB_API_KEY = "94a5949fb193a0bcee844b15a49743bf";

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!nombreProducto.trim()) {
      setUploadMsg("Escribe el nombre del producto");
      return;
    }
    if (!categoria) {
      setUploadMsg("Selecciona una categoría");
      return;
    }
    // Permitir coma o punto en el precio
    const precioNum = Number(precio.toString().replace(',', '.'));
    if (!precio || isNaN(precioNum)) {
      setUploadMsg("Ingresa un precio válido (usa punto o coma)");
      return;
    }
    if (!descripcion.trim()) {
      setUploadMsg("Agrega una descripción");
      return;
    }
    if (!selectedImage) {
      setUploadMsg("Selecciona una imagen primero");
      return;
    }
    if (IMGBB_API_KEY === "TU_API_KEY_DE_IMGBB") {
      setUploadMsg("⚠️ Configura tu API key de ImgBB en el código (admin/page.js)");
      return;
    }

    // Verificar tamaño máximo
    if (selectedImage.size > 10 * 1024 * 1024) {
      setUploadMsg("⚠️ La imagen es muy pesada (máx 10MB). Usa una imagen más pequeña.");
      return;
    }

    try {
      setUploadMsg("⏳ Subiendo imagen...");

      // Comprimir imagen rápido (redimensionar a máx 800px y convertir a JPEG ligero)
      const compressImage = (file) => new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 800;
          if (width > MAX_SIZE || height > MAX_SIZE) {
            if (width > height) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            } else {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Error al comprimir"));
          }, 'image/jpeg', 0.7);
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });

      const compressedBlob = await compressImage(selectedImage);

      // Subir directo como archivo (más rápido que base64)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const formData = new FormData();
      formData.append("key", IMGBB_API_KEY);
      formData.append("image", compressedBlob, nombreProducto.replace(/\s+/g, '-') + '.jpg');

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) throw new Error(data.error?.message || "Error al subir imagen");
      const imageUrl = data.data.display_url;

      const { error: supaError } = await supabase.from('productos').insert([
        {
          nombre: nombreProducto,
          categoria,
          precio: precioNum,
          descripcion,
          imagen: imageUrl,
          disponible: true,
          creado: new Date().toISOString(),
        }
      ]);
      if (supaError) throw new Error(supaError.message);

      setUploadMsg("¡Producto subido correctamente!");
      setSelectedImage(null);
      setPreviewUrl(null);
      setNombreProducto("");
      setCategoria("");
      setPrecio("");
      setDescripcion("");

      setTimeout(() => {
        setUploadMsg("");
      }, 3000);
    } catch (err) {
      console.error(err);
      if (err.name === 'AbortError') {
        setUploadMsg("⏱️ Tiempo agotado. Intenta con una imagen más pequeña.");
      } else {
        setUploadMsg("❌ Error: " + (err.message || "No se pudo subir el producto"));
      }
    }
  };

  const handleDelete = async (producto) => {
    if (!confirm(`¿Eliminar ${producto.nombre}?`)) return;
    try {
      const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', producto.id);
      if (error) throw error;
      setProductos(productos.filter(p => p.id !== producto.id));
      setUploadMsg("Producto eliminado");
      setTimeout(() => setUploadMsg(""), 2000);
    } catch (err) {
      console.error(err);
      setUploadMsg("Error al eliminar");
    }
  };

  return (
    <>
      {!isLogged ? (
        <div className="admin-login-container">
          <div className="admin-login-card">
            <div className="admin-logo-circle">
              <img src="/logo.png" alt="Morena Luna" className="admin-logo-img" />
            </div>
            
            <h1 className="admin-title">MORENA LUNA</h1>
            <p className="admin-subtitle">Panel de Administración</p>
            
            <form className="admin-form" onSubmit={handleLogin}>
              <div className="admin-input-group">
                <label className="admin-label">Usuario</label>
                <input
                  type="text"
                  className="admin-input"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>
              
              <div className="admin-input-group">
                <label className="admin-label">Contraseña</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? "text" : "password"}
                    className="admin-input"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    required
                    style={{ paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#a78bfa',
                      fontSize: 18
                    }}
                    tabIndex={-1}
                    aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              
              {error && <div className="admin-error">{error}</div>}
              
              <button type="submit" className="admin-btn">
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      ) : isLogged === 'upload' ? (
        <div className="admin-upload-overlay">
          <div className="admin-upload-card">
            <h2 className="admin-upload-title">Subir Nuevo Producto</h2>
            
            <form className="admin-form" onSubmit={handleUpload}>
              {uploadMsg && (
                <div style={{
                  background: '#fff0f3',
                  color: '#b91c1c',
                  border: '1.5px solid #fbbf24',
                  borderRadius: 12,
                  padding: '10px 18px',
                  marginBottom: 18,
                  fontWeight: 600,
                  fontSize: 16,
                  textAlign: 'center',
                  boxShadow: '0 2px 8px 0 rgba(250,204,21,0.08)'
                }}>
                  {uploadMsg}
                </div>
              )}
              <div className="admin-input-group">
                <label className="admin-label">Nombre del Producto</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Ej: Collar de Perlas"
                  value={nombreProducto}
                  onChange={e => setNombreProducto(e.target.value)}
                  required
                />
              </div>
              
              <div className="admin-input-group">
                <label className="admin-label">Categoría</label>
                <select
                  className="admin-input"
                  value={categoria}
                  onChange={e => setCategoria(e.target.value)}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias && categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                  ))}
                </select>
              </div>
              
              <div className="admin-input-group">
                <label className="admin-label">Precio</label>
                <input
                  type="number"
                  className="admin-input"
                  placeholder="Ej: 12.99"
                  value={precio}
                  onChange={e => setPrecio(e.target.value)}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="admin-input-group">
                <label className="admin-label">Descripción</label>
                <textarea
                  className="admin-input"
                  placeholder="Describe el producto..."
                  value={descripcion}
                  onChange={e => setDescripcion(e.target.value)}
                  rows={3}
                  required
                />
              </div>
              
              <div className="admin-input-group">
                <label className="admin-label">Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  className="admin-input"
                  onChange={handleImageChange}
                  required
                />
              </div>
              
              {previewUrl && (
                <div className="admin-preview">
                  <img src={previewUrl} alt="Vista previa" className="admin-preview-img" />
                </div>
              )}
              
              {uploadMsg && <div className="admin-success">{uploadMsg}</div>}
              
              <div className="admin-btn-group">
                <button type="submit" className="admin-btn">
                  Subir Producto
                </button>
                <button 
                  type="button" 
                  className="admin-btn-secondary" 
                  onClick={() => setIsLogged(true)}
                >
                  Volver
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="admin-dashboard">
          <div className="admin-dashboard-header">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: showEditUser ? 40 : 0 }}>
              <button
                className="admin-btn-secondary"
                style={{ alignSelf: 'flex-end', margin: '10px 0 0 0', minWidth: 180, fontWeight: 600, fontSize: 18 }}
                onClick={() => setShowEditUser(v => !v)}
              >
                {showEditUser ? 'Cerrar edición' : 'Editar usuario/contraseña'}
              </button>
              {showEditUser && (
                <div style={{
                  background: 'rgba(30, 20, 50, 0.95)',
                  borderRadius: 18,
                  boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18)',
                  padding: '32px 32px 24px 32px',
                  marginTop: 24,
                  width: '100%',
                  maxWidth: 600,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  border: '1.5px solid #a78bfa',
                }}>
                  <h3 style={{ color: '#facc15', fontWeight: 700, fontSize: 26, marginBottom: 18, letterSpacing: 0.5 }}>Editar usuario y contraseña</h3>
                  <form className="admin-form" onSubmit={handleEditUser} style={{ width: '100%' }}>
                    <div className="admin-input-group">
                      <label className="admin-label" style={{ fontSize: 18 }}>Nuevo usuario</label>
                      <input type="text" className="admin-input" value={newUser} onChange={e => setNewUser(e.target.value)} placeholder="Nuevo usuario" required style={{ fontSize: 18, padding: '12px 16px' }} />
                    </div>
                    <div className="admin-input-group">
                      <label className="admin-label" style={{ fontSize: 18 }}>Nueva contraseña</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showEditPass ? "text" : "password"}
                          className="admin-input"
                          value={newPass}
                          onChange={e => setNewPass(e.target.value)}
                          placeholder="Nueva contraseña"
                          required
                          style={{ fontSize: 18, padding: '12px 16px', paddingRight: 44 }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowEditPass(v => !v)}
                          style={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#a78bfa',
                            fontSize: 18
                          }}
                          tabIndex={-1}
                          aria-label={showEditPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        >
                          {showEditPass ? '🙈' : '👁️'}
                        </button>
                      </div>
                    </div>
                    {userMsg && <div className="admin-success" style={{ margin: '10px 0', fontSize: 17, textAlign: 'center' }}>{userMsg}</div>}
                    <button type="submit" className="admin-btn" style={{ fontSize: 20, marginTop: 10, width: '100%' }}>Guardar cambios</button>
                  </form>
                </div>
              )}
            </div>
            <div className="admin-logo-circle">
              <img src="/logo.png" alt="Morena Luna" className="admin-logo-img" />
            </div>
            <h2 className="admin-dashboard-title">¡Bienvenido, Administrador!</h2>
            <p className="admin-dashboard-subtitle">
              Gestiona tu catálogo de productos de manera profesional
            </p>
            <button 
              className="admin-btn" 
              onClick={() => setIsLogged('upload')}
            >
              + Subir Nuevo Producto
            </button>
          </div>
          
          <div className="admin-products-section">
            <h3 className="admin-products-title">Productos Subidos</h3>
            
            {loadingProductos ? (
              <div className="admin-loading">Cargando productos...</div>
            ) : productos.length === 0 ? (
              <div className="admin-empty">No hay productos aún</div>
            ) : (
              <div className="admin-products-grid">
                {productos.map(producto => (
                  <div key={producto.id} className="admin-product-card">
                    {editandoProducto === producto.id ? (
                      <form className="admin-edit-form" onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 16px #0002', minWidth: 320 }}>
                        <label style={{ fontWeight: 600, marginBottom: 4 }}>Nombre
                          <input
                            type="text"
                            name="nombre"
                            value={editForm.nombre}
                            onChange={handleEditChange}
                            placeholder="Nombre"
                            required
                            style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginTop: 2 }}
                          />
                        </label>
                        <label style={{ fontWeight: 600, marginBottom: 4 }}>Categoría
                          <input
                            type="text"
                            name="categoria"
                            value={editForm.categoria}
                            onChange={handleEditChange}
                            placeholder="Categoría"
                            required
                            style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginTop: 2 }}
                          />
                        </label>
                        <label style={{ fontWeight: 600, marginBottom: 4 }}>Precio
                          <input
                            type="number"
                            name="precio"
                            value={editForm.precio}
                            onChange={handleEditChange}
                            placeholder="Precio"
                            required
                            min="0"
                            step="0.01"
                            style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginTop: 2 }}
                          />
                        </label>
                        <label style={{ fontWeight: 600, marginBottom: 4 }}>Descripción
                          <textarea
                            name="descripcion"
                            value={editForm.descripcion}
                            onChange={handleEditChange}
                            placeholder="Descripción"
                            rows={3}
                            style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginTop: 2, resize: 'vertical' }}
                          />
                        </label>
                        <label style={{ fontWeight: 600, marginBottom: 4 }}>Imagen
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleEditImage}
                            style={{ marginTop: 2 }}
                          />
                        </label>
                        {editForm.imagen && (
                          <img src={editForm.imagen} alt="preview" style={{ width: 120, margin: '10px auto', borderRadius: 8, boxShadow: '0 1px 6px #0001' }} />
                        )}
                        <button type="submit" className="admin-btn" style={{ fontSize: 20, marginTop: 10, width: '100%' }}>Guardar</button>
                        <button type="button" className="admin-delete-btn" style={{ fontSize: 18, width: '100%' }} onClick={handleCancelEdit}>Cancelar</button>
                      </form>
                    ) : (
                      <>
                        <img 
                          src={producto.imagen} 
                          alt={producto.nombre} 
                          className="admin-product-img"
                        />
                        <div className="admin-product-info">
                          <h4 className="admin-product-name">{producto.nombre}</h4>
                          <p className="admin-product-category">{producto.categoria}</p>
                          <p className="admin-product-price">${producto.precio?.toFixed(2)}</p>
                        </div>
                        <button 
                          className="admin-btn"
                          style={{ marginRight: 8 }}
                          onClick={() => handleEdit(producto)}
                        >
                          Editar
                        </button>
                        <button 
                          className="admin-delete-btn"
                          onClick={() => handleDelete(producto)}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}