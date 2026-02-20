'use client'
import { useEffect, useState } from 'react'

export default function Notificacion({ mensaje }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(timer)
  }, [mensaje])

  return (
    <div className={`notificacion-pro ${visible ? 'notificacion-enter' : 'notificacion-exit'}`}>
      <div className="notificacion-icon">✓</div>
      <span className="notificacion-text">{mensaje}</span>
      <div className="notificacion-progress" />
    </div>
  )
}
