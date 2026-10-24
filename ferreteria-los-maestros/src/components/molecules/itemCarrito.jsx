import { formatoCLP } from '../../utils/precios'
import Boton from '../atoms/boton'
import ContadorCantidad from '../atoms/contadorCantidad'
import Precio from '../atoms/precio'

export default function ItemCarrito({ linea, onCambiar, onQuitar }) {
    return (
        <li className="item-carrito">
      <div className="item-info">
        <strong>{linea.nombre}</strong>
        <small>{linea.marca}</small>
        <Precio valor={linea.precio} original={linea.precioOriginal} />
      </div>
      <ContadorCantidad
        valor={linea.cantidad}
        max={linea.stock}
        onChange={(n) => onCambiar(linea.codigo, n)}
        />
      <span className="item-subtotal">{formatoCLP(linea.subtotal)}</span>
      <Boton variante="peligro" onClick={() => onQuitar(linea.codigo)}>Quitar</Boton>
    </li>
  )
}
