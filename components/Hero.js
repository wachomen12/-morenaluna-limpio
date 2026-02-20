'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 30 // Reducido para minimalismo

    class Particle {
      constructor() {
        this.reset()
        this.y = Math.random() * canvas.height
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = -10
        this.size = Math.random() * 2 + 0.5
        this.speedY = Math.random() * 0.5 + 0.3
        this.opacity = Math.random() * 0.3 + 0.1
      }

      update() {
        this.y += this.speedY
        
        if (this.y > canvas.height) {
          this.reset()
        }
      }

      draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="inicio" className="hero-clean">
      <canvas ref={canvasRef} className="particles-clean" />
      
      <div className="hero-content-clean">
        <h1 className="hero-title-clean">
          MORENA LUNA
        </h1>
        
        <p className="hero-subtitle-clean">By Arianna</p>
        
        <div className="hero-divider"></div>
        
        <p className="hero-description-clean">
          Accesorios y pulseras de diseño exclusivo
        </p>
        
        <a href="#productos" className="hero-btn-clean">
          Ver Colección
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </section>
  )
}