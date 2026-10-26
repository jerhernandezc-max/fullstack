import { Link } from 'react-router-dom'
import Descripcion from '../components/atoms/descripcion'
import { useTienda } from '../context/tiendaContext'

export default function Categorias() {
  const { productos } = useTienda()
  const categorias = [...new Set(productos.map((p) => p.categoria))].sort()

  return (
    <section id="categorias">
      <h2>Categorías</h2>
      <Descripcion className="intro">Elige una categoría para ver sus productos.</Descripcion>
      <ul className="lista-categorias">
        {categorias.map((cat) => (
          <li key={cat}>
            <Link to={`/catalogo?categoria=${encodeURIComponent(cat)}`}>{cat}</Link>
            {' '}({productos.filter((p) => p.categoria === cat).length} productos)
          </li>
        ))}
      </ul>
    </section>
  )
}