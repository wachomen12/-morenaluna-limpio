import { FaInstagram, FaWhatsapp, FaFacebookF, FaTiktok, FaHeart } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="footer-pro">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo-wrapper">
            <img src="/logo.png" alt="Morena Luna" className="footer-logo-img" />
          </div>
          <h3 className="footer-brand-name">MORENA LUNA</h3>
          <p className="footer-brand-tagline">By Arianna</p>
          <p className="footer-brand-desc">
            Accesorios y pulseras de diseño exclusivo, 
            hechos con amor y dedicación.
          </p>
        </div>

        <div className="footer-links-section">
          <h4>Navegación</h4>
          <a href="#inicio">Inicio</a>
          <a href="#productos">Productos</a>
          <a href="#contacto">Contacto</a>
        </div>

        <div className="footer-links-section">
          <h4>Categorías</h4>
          <a href="#productos">Collares</a>
          <a href="#productos">Pulseras</a>
          <a href="#productos">Chokers</a>
        </div>

        <div className="footer-social-section">
          <h4>Síguenos</h4>
          <div className="footer-social-icons">
            <a href="https://www.instagram.com/morena_luna.accesorios" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://wa.me/593960917422" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="https://www.facebook.com/share/17sb4rdkXW/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.tiktok.com/@morena_luna.accesorios" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MORENA LUNA - By Arianna. Todos los derechos reservados.</p>
        <p className="footer-made-with">Hecho con <FaHeart className="footer-heart" /> en Ecuador</p>
      </div>
    </footer>
  )
}
