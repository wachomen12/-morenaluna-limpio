'use client'
import { useState } from 'react'

export default function ProductosGrid({ productos, onProductoClick }) {
  const [imageLoaded, setImageLoaded] = useState({})

  return (
    <section id="productos" className="productos-pro">
      {productos.length === 0 ? (
        <div className="productos-empty">
          <div className="productos-empty-icon">✨</div>
          <h3>No hay productos disponibles</h3>
          <p>Pronto agregaremos nuevos diseños exclusivos para ti</p>
        </div>
      ) : (
        <div className="productos-grid-pro">
          {productos.map((producto, index) => (
            <div 
              key={producto.id} 
              className="producto-card-pro"
              onClick={() => onProductoClick(producto)}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="producto-img-container-pro">
                {!imageLoaded[producto.id] && (
                  <div className="producto-img-skeleton" />
                )}
                {producto.imagen && (
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className={`producto-img-pro ${imageLoaded[producto.id] ? 'loaded' : ''}`}
                    loading="lazy"
                    onLoad={() => setImageLoaded(prev => ({ ...prev, [producto.id]: true }))}
                  />
                )}
                {producto.disponible !== false && (
                  <span className="producto-badge-pro">Disponible</span>
                )}
              </div>
              <div className="producto-info-pro">
                <span className="producto-categoria-pro">
                  {producto.categoria?.toUpperCase()}
                </span>
                <h3 className="producto-titulo-pro">{producto.nombre}</h3>
                <div className="producto-precio-container">
                  <span className="producto-precio-pro">
                    ${producto.precio?.toFixed(2)}
                  </span>
                </div>
                <button className="producto-button-pro">
                  <span>Añadir al carrito</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
