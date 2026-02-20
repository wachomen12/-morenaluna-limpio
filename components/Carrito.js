import { FaWhatsapp, FaTimes, FaMinus, FaPlus, FaTrashAlt, FaShoppingBag } from 'react-icons/fa'

export default function Carrito({ 
  items, 
  total, 
  onClose, 
  onActualizarCantidad, 
  onEliminar,
  onComprar 
}) {
  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0)

  return (
    <>
      <div className="carrito-overlay" onClick={onClose} />
      <div className="carrito-sidebar">
        <div className="carrito-header">
          <div className="carrito-header-left">
            <FaShoppingBag size={18} />
            <h2>Mi Carrito</h2>
            {totalItems > 0 && (
              <span className="carrito-badge">{totalItems}</span>
            )}
          </div>
          <button className="close-carrito" onClick={onClose} aria-label="Cerrar carrito">
            <FaTimes />
          </button>
        </div>

        <div className="carrito-items">
          {items.length === 0 ? (
            <div className="carrito-empty">
              <div className="carrito-empty-icon">
                <FaShoppingBag size={48} />
              </div>
              <p className="carrito-empty-title">Tu carrito está vacío</p>
              <p className="carrito-empty-sub">¡Explora nuestra colección y encuentra algo especial!</p>
              <button className="carrito-empty-btn" onClick={onClose}>
                Ver Productos
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="carrito-item">
                <img 
                  src={item.imagen} 
                  alt={item.nombre}
                  className="carrito-item-img"
                />
                <div className="carrito-item-info">
                  <p className="carrito-item-titulo">{item.nombre}</p>
                  <p className="carrito-item-precio">${item.precio.toFixed(2)}</p>
                  <div className="carrito-item-cantidad">
                    <button 
                      className="cantidad-btn"
                      onClick={() => onActualizarCantidad(item.id, -1)}
                      aria-label="Reducir cantidad"
                    >
                      <FaMinus size={10} />
                    </button>
                    <span>{item.cantidad}</span>
                    <button 
                      className="cantidad-btn"
                      onClick={() => onActualizarCantidad(item.id, 1)}
                      aria-label="Aumentar cantidad"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>
                <div className="carrito-item-right">
                  <span className="carrito-item-subtotal">
                    ${(item.precio * item.cantidad).toFixed(2)}
                  </span>
                  <button 
                    className="carrito-item-remove"
                    onClick={() => onEliminar(item.id)}
                    aria-label={`Eliminar ${item.nombre}`}
                  >
                    <FaTrashAlt size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="carrito-footer">
            <div className="carrito-summary">
              <div className="carrito-summary-row">
                <span>Subtotal ({totalItems} {totalItems === 1 ? 'artículo' : 'artículos'})</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="carrito-summary-row carrito-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              className="btn-whatsapp"
              onClick={onComprar}
              disabled={items.length === 0}
            >
              <FaWhatsapp size={20} /> Pedir por WhatsApp
            </button>
            <p className="carrito-secure-info">
              🔒 Pago seguro al recibir tu pedido
            </p>
          </div>
        )}
      </div>
    </>
  )
}
