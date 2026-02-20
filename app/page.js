"use client"

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Filtros from '@/components/Filtros'
import ProductosGrid from '@/components/ProductosGrid'
import ProductoModal from '@/components/ProductoModal'
import Carrito from '@/components/Carrito'
import Contacto from '@/components/Contacto'
import Footer from '@/components/Footer'
import Notificacion from '@/components/Notificacion'
import { FaWhatsapp } from 'react-icons/fa'

import { supabase } from '../lib/supabaseClient';

export default function Home() {

  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [productoModal, setProductoModal] = useState(null);
  const [notificacion, setNotificacion] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Cargar productos desde Supabase en tiempo real
  useEffect(() => {
    const cargarProductos = async () => {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('disponible', true);

      if (!error) setProductos(data);
      setLoading(false);
    };

    cargarProductos();

    // Suscripción en tiempo real
    const channel = supabase
      .channel('productos-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'productos' }, () => {
        cargarProductos();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // Mostrar botón de scroll top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtrar productos
  const productosFiltrados = filtroActivo === 'todos'
    ? productos
    : productos.filter(p => p.categoria === filtroActivo);

  // Agregar al carrito
  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id)
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      }
      return [...prev, { ...producto, cantidad }]
    })
    setProductoModal(null)
    mostrarNotificacion(`${producto.nombre} agregado al carrito!`)
  }

  // Actualizar cantidad
  const actualizarCantidad = (id, cambio) => {
    setCarrito(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, item.cantidad + cambio) }
          : item
      )
    )
  }

  // Eliminar del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id))
  }

  // Total del carrito
  const totalCarrito = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0)

  // Notificación
  const mostrarNotificacion = (mensaje) => {
    setNotificacion(mensaje)
    setTimeout(() => setNotificacion(null), 3000)
  }

  // Comprar por WhatsApp
  const comprarPorWhatsApp = () => {
    if (carrito.length === 0) return
    const numeroWhatsApp = '593960917422';
    const mensaje = `¡Hola MORENA LUNA! 🌙\n\nQuisiera hacer el siguiente pedido:\n\n${
      carrito.map(item => `• ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`).join('\n')
    }\n\n💰 Total: $${totalCarrito.toFixed(2)}\n\n¡Gracias!`
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`, '_blank')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main>
      <Header 
        totalItems={totalItems}
        onCarritoClick={() => setCarritoAbierto(true)}
      />
      
      <Hero />
      
      <Filtros 
        filtroActivo={filtroActivo}
        onFiltroChange={setFiltroActivo}
      />
      
      <div id="productos">
        {loading ? (
          <section className="productos-pro">
            <div className="productos-grid-pro">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="producto-card-pro skeleton-card">
                  <div className="producto-img-container-pro">
                    <div className="skeleton-img" />
                  </div>
                  <div className="producto-info-pro">
                    <div className="skeleton-line skeleton-sm" />
                    <div className="skeleton-line skeleton-md" />
                    <div className="skeleton-line skeleton-lg" />
                    <div className="skeleton-btn" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <ProductosGrid 
            productos={productosFiltrados}
            onProductoClick={setProductoModal}
          />
        )}
      </div>
      
      {productoModal && (
        <ProductoModal 
          producto={productoModal}
          onClose={() => setProductoModal(null)}
          onAgregar={agregarAlCarrito}
        />
      )}
      
      {carritoAbierto && (
        <Carrito 
          items={carrito}
          total={totalCarrito}
          onClose={() => setCarritoAbierto(false)}
          onActualizarCantidad={actualizarCantidad}
          onEliminar={eliminarDelCarrito}
          onComprar={comprarPorWhatsApp}
        />
      )}
      
      <Contacto />
      
      <Footer />
      
      {notificacion && <Notificacion mensaje={notificacion} />}

      {/* Botón flotante de WhatsApp */}
      <a 
        href="https://wa.me/593960917422" 
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* Botón scroll to top */}
      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Volver arriba">
          ↑
        </button>
      )}
    </main>
  )
}