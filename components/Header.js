'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaShoppingBag, FaBars, FaTimes } from 'react-icons/fa'

export default function Header({ totalItems, onCarritoClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => {
    setMenuOpen(false)
  }

  return (
    <header className={`header-premium ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-content-premium">
        <Link href="/" className="logo-premium">
          <div className="logo-circle-header">
            <img src="/logo.png" alt="Morena Luna" className="logo-img-premium" />
          </div>
          <span className="logo-text-premium">MORENA LUNA</span>
        </Link>

        <nav className={`nav-premium ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#inicio" className="nav-link-premium" onClick={handleNavClick}>Inicio</a>
          <a href="#productos" className="nav-link-premium" onClick={handleNavClick}>Productos</a>
          <a href="#contacto" className="nav-link-premium" onClick={handleNavClick}>Contacto</a>
        </nav>

        <div className="header-actions">
          <button className="cart-btn-premium" onClick={onCarritoClick} aria-label="Carrito de compras">
            <FaShoppingBag />
            {totalItems > 0 && (
              <span className="cart-badge-premium">{totalItems}</span>
            )}
          </button>
          
          <button 
            className="hamburger-btn" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Overlay para cerrar menú móvil */}
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  )
}