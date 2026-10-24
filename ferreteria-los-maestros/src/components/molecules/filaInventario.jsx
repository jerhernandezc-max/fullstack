import { formatoCLP } from '../../utils/precios'
import Boton from '../atoms/boton'
import EtiquetaStock from '../atoms/etiquetaStock'

export default function FilaInventario({ producto, onEditar, onEliminar }) {
  return (
    <tr>
      <td>{producto.codigo}</td>
      <td>{producto.nombre}</td>
      <td>{producto.categoria}</td>
      <td>{formatoCLP(producto.precioVenta)}</td>
      <td><EtiquetaStock stock={producto.stock} stockMinimo={producto.stockMinimo} /></td>
      <td className="acciones">
        <Boton variante="secundario" onClick={() => onEditar(producto)}>Editar</Boton>
        <Boton variante="peligro" onClick={() => onEliminar(producto)}>Eliminar</Boton>
      </td>
    </tr>
  )
}