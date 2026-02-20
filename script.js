// ==================== FIREBASE CONFIG ====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDUnNJETqw9S5eF89bDkEgYYwKRXIr-2nk",
    authDomain: "morenaluna-cd983.firebaseapp.com",
    projectId: "morenaluna-cd983",
    storageBucket: "morenaluna-cd983.firebasestorage.app",
    messagingSenderId: "52409390824",
    appId: "1:52409390824:web:efb8548bb073ac7f785b5d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==================== VARIABLES GLOBALES ====================
let productos = [];
let carrito = [];
let productoSeleccionado = null;

// ==================== DOM ELEMENTS ====================
const productosGrid = document.getElementById('productosGrid');
const filtros = document.querySelectorAll('.filtro-btn');
const modal = document.getElementById('productoModal');
const closeModal = document.querySelector('.close');
const carritoIcon = document.querySelector('.carrito-icon');
const carritoSidebar = document.getElementById('carritoSidebar');
const closeCarrito = document.querySelector('.close-carrito');
const carritoItems = document.getElementById('carritoItems');
const carritoTotal = document.getElementById('carritoTotal');
const agregarCarritoBtn = document.getElementById('agregarCarrito');
const cantidad = document.getElementById('cantidad');

// ==================== CARGAR PRODUCTOS DESDE FIREBASE ====================
async function cargarProductos() {
    try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        productos = [];
        querySnapshot.forEach((doc) => {
            productos.push({ id: doc.id, ...doc.data() });
        });
        renderProductos();
    } catch (error) {
        console.error("Error cargando productos:", error);
        // Mostrar mensaje si no hay productos
        productosGrid.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Cargando productos...</p>';
    }
}

// Escuchar cambios en tiempo real
function escucharCambios() {
    onSnapshot(collection(db, "productos"), (snapshot) => {
        productos = [];
        snapshot.forEach((doc) => {
            productos.push({ id: doc.id, ...doc.data() });
        });
        renderProductos();
    });
}

// ==================== RENDERIZAR PRODUCTOS ====================
function renderProductos(filtro = 'todos') {
    productosGrid.innerHTML = '';

    if (productos.length === 0) {
        productosGrid.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem; grid-column: 1/-1;">No hay productos disponibles.</p>';
        return;
    }

    const productosFiltrados = filtro === 'todos' 
        ? productos 
        : productos.filter(p => p.categoria === filtro);

    if (productosFiltrados.length === 0) {
        productosGrid.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem; grid-column: 1/-1;">No hay productos en esta categoria.</p>';
        return;
    }

    productosFiltrados.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img" onerror="this.src='https://via.placeholder.com/300/f0e6f5/6B4D7A?text=Imagen'">
            ${producto.disponible ? '<span class="producto-badge">En Stock</span>' : ''}
            <div class="producto-info">
                <p class="producto-categoria">${producto.categoria}</p>
                <h3 class="producto-titulo">${producto.nombre}</h3>
                <p class="producto-precio">$${Number(producto.precio).toFixed(2)}</p>
                <button class="producto-button" ${!producto.disponible ? 'disabled' : ''}>
                    ${producto.disponible ? 'Ver Detalles' : 'Agotado'}
                </button>
            </div>
        `;

        card.addEventListener('click', () => {
            if (producto.disponible) {
                abrirModal(producto);
            }
        });

        productosGrid.appendChild(card);
    });
}

// ==================== MODAL ====================
function abrirModal(producto) {
    productoSeleccionado = producto;
    document.getElementById('modalImg').src = producto.imagen;
    document.getElementById('modalTitulo').textContent = producto.nombre;
    document.getElementById('modalPrecio').textContent = `$${Number(producto.precio).toFixed(2)}`;
    document.getElementById('modalDescripcion').textContent = producto.descripcion || 'Producto de MORENA LUNA';
    document.getElementById('modalDisponibilidad').textContent = '✓ Disponible en stock';
    cantidad.value = 1;
    modal.style.display = 'block';
}

closeModal.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// ==================== CARRITO ====================
agregarCarritoBtn.addEventListener('click', () => {
    const cant = parseInt(cantidad.value);
    const itemExistente = carrito.find(item => item.id === productoSeleccionado.id);

    if (itemExistente) {
        itemExistente.cantidad += cant;
    } else {
        carrito.push({
            ...productoSeleccionado,
            cantidad: cant
        });
    }

    actualizarCarrito();
    modal.style.display = 'none';
    mostrarNotificacion(`${productoSeleccionado.nombre} agregado al carrito!`);
});

carritoIcon.addEventListener('click', () => {
    carritoSidebar.classList.toggle('open');
});

closeCarrito.addEventListener('click', () => {
    carritoSidebar.classList.toggle('open');
});

function actualizarCarrito() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.querySelector('.carrito-count').textContent = totalItems;

    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        carritoTotal.textContent = '$0.00';
        return;
    }

    carritoItems.innerHTML = carrito.map(item => `
        <div class="carrito-item">
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="carrito-item-info">
                <h4>${item.nombre}</h4>
                <p>$${Number(item.precio).toFixed(2)} x ${item.cantidad}</p>
            </div>
            <div class="carrito-item-actions">
                <button onclick="cambiarCantidad('${item.id}', -1)">-</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad('${item.id}', 1)">+</button>
                <button onclick="eliminarDelCarrito('${item.id}')" class="eliminar-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    carritoTotal.textContent = `$${total.toFixed(2)}`;
}

window.cambiarCantidad = function(id, cambio) {
    const item = carrito.find(item => item.id === id);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(item => item.id !== id);
        }
        actualizarCarrito();
    }
};

window.eliminarDelCarrito = function(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
};

// ==================== WHATSAPP ====================
window.finalizarCompra = function() {
    if (carrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío');
        return;
    }

    let mensaje = '¡Hola! Me interesa comprar:\n\n';
    carrito.forEach(item => {
        mensaje += `• ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}\n`;
    });
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    mensaje += `\n*Total: $${total.toFixed(2)}*`;

    const numeroWhatsapp = '593987654321'; // Cambiar por el número real
    const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsapp, '_blank');
};

// ==================== FILTROS ====================
filtros.forEach(btn => {
    btn.addEventListener('click', () => {
        filtros.forEach(b => b.classList.remove('activo'));
        btn.classList.add('activo');
        renderProductos(btn.dataset.categoria);
    });
});

// ==================== NOTIFICACIONES ====================
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.classList.add('show');
    }, 100);

    setTimeout(() => {
        notificacion.classList.remove('show');
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}

// ==================== INICIALIZAR ====================
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    escucharCambios();
    actualizarCarrito();
});
