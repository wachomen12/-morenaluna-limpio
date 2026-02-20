import { categorias } from '@/data/productos'

export default function Filtros({ filtroActivo, onFiltroChange }) {
  const totalCategorias = categorias.length

  return (
    <section className="filtros" id="productos">
      <div className="filtros-header">
        <span className="filtros-badge">Colección</span>
        <h2 className="filtros-titulo">Nuestra Colección</h2>
        <p className="filtros-subtitulo">
          Explora {totalCategorias} categorías de accesorios exclusivos
        </p>
      </div>
      <div className="filtros-container">
        <button
          key="todos"
          className={`filtro-btn ${filtroActivo === 'todos' ? 'active' : ''}`}
          onClick={() => onFiltroChange('todos')}
        >
          ✨ Todos
        </button>
        {categorias.map(cat => (
          <button
            key={cat.id}
            className={`filtro-btn ${filtroActivo === cat.id ? 'active' : ''}`}
            onClick={() => onFiltroChange(cat.id)}
          >
            {cat.nombre}
          </button>
        ))}
      </div>
    </section>
  )
}
