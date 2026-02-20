import { FaWhatsapp, FaFacebookF, FaTiktok, FaInstagram } from 'react-icons/fa'

export default function Contacto() {
  return (
    <section id="contacto" className="contacto-section">
      <div className="contacto-container">
        <div className="contacto-header">
          <span className="contacto-badge">Estamos para ti</span>
          <h2 className="contacto-title">Contáctanos</h2>
          <p className="contacto-subtitle">
            ¿Tienes dudas o quieres hacer un pedido personalizado? ¡Escríbenos!
          </p>
        </div>
        
        <div className="contacto-grid">
          <a href="https://wa.me/593960917422" target="_blank" rel="noopener noreferrer" className="contacto-card contacto-whatsapp">
            <div className="contacto-card-icon">
              <FaWhatsapp />
            </div>
            <h3>WhatsApp</h3>
            <p>0960917422</p>
            <span className="contacto-card-action">Enviar mensaje →</span>
          </a>

          <a href="https://www.instagram.com/morena_luna.accesorios" target="_blank" rel="noopener noreferrer" className="contacto-card contacto-instagram">
            <div className="contacto-card-icon">
              <FaInstagram />
            </div>
            <h3>Instagram</h3>
            <p>@morena_luna.accesorios</p>
            <span className="contacto-card-action">Seguir →</span>
          </a>

          <a href="https://www.facebook.com/share/17sb4rdkXW/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="contacto-card contacto-facebook">
            <div className="contacto-card-icon">
              <FaFacebookF />
            </div>
            <h3>Facebook</h3>
            <p>Morena Luna</p>
            <span className="contacto-card-action">Visitar →</span>
          </a>

          <a href="https://www.tiktok.com/@morena_luna.accesorios" target="_blank" rel="noopener noreferrer" className="contacto-card contacto-tiktok">
            <div className="contacto-card-icon">
              <FaTiktok />
            </div>
            <h3>TikTok</h3>
            <p>@morena_luna.accesorios</p>
            <span className="contacto-card-action">Seguir →</span>
          </a>
        </div>
      </div>
    </section>
  )
}
