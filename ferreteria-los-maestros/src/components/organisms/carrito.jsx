import { Link } from 'react-router-dom'
import { useTienda } from '../../context/tiendaContext'
import { formatoCLP } from '../../utils/precios'
import Boton from '../atoms/boton'
import ItemCarrito from '../molecules/itemCarrito'

export default function Carrito() {
  const { lineas, totalCarrito, cambiarCantidad, quitar, vaciar } = useTienda()

  if (lineas.length === 0) {
    return (
      <p className="sin-resultados">
        Tu carrito está vacío. <Link to="/catalogo">Ir al catálogo</Link>
      </p>
    )
  }

  return (
    <div>
      <ul className="lista-carrito">
        {lineas.map((l) => (
          <ItemCarrito key={l.codigo} linea={l} onCambiar={cambiarCantidad} onQuitar={quitar} />
        ))}
      </ul>
      <div className="carrito-total">
        <strong>Total: {formatoCLP(totalCarrito)}</strong>
        <Boton variante="secundario" onClick={vaciar}>Vaciar carrito</Boton>
      </div>
    </div>
  )
}