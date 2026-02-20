'use client'

import { useState } from 'react'
import { FaCheck, FaMinus, FaPlus } from 'react-icons/fa'

export default function ProductoModal({ producto, onClose, onAgregar }) {
  const [cantidad, setCantidad] = useState(1)

  const handleAgregar = () => {
    onAgregar(producto, cantidad)
  }

  const incrementar = () => setCantidad(prev => prev + 1)
  const decrementar = () => setCantidad(prev => Math.max(1, prev - 1))

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        <div className="modal-body">
          <img 
            src={producto.imagen} 
            alt={producto.nombre}
            className="modal-img"
          />
          <div className="modal-info">
            <span className="producto-categoria-pro" style={{ marginBottom: '0.5rem' }}>
              {producto.categoria?.toUpperCase()}
            </span>
            <h2>{producto.nombre}</h2>
            <p className="modal-precio">${producto.precio.toFixed(2)}</p>
            <p className="modal-descripcion">{producto.descripcion}</p>
            <p className="modal-disponibilidad">
              <FaCheck /> Disponible en stock
            </p>
            <div className="modal-actions">
              <div className="cantidad-controls">
                <button className="cantidad-btn" onClick={decrementar} aria-label="Reducir cantidad">
                  <FaMinus size={10} />
                </button>
                <span className="cantidad-display">{cantidad}</span>
                <button className="cantidad-btn" onClick={incrementar} aria-label="Aumentar cantidad">
                  <FaPlus size={10} />
                </button>
              </div>
              <button className="btn-agregar" onClick={handleAgregar}>
                Agregar al Carrito — ${(producto.precio * cantidad).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
