import { Link } from 'react-router-dom'
import { useTienda } from '../../context/tiendaContext'
import { esOferta, precioFinal } from '../../utils/precios'
import Boton from '../atoms/boton'
import EtiquetaStock from '../atoms/etiquetaStock'
import Precio from '../atoms/precio'

export default function TarjetaProducto({ producto }) {
  const { agregar } = useTienda()

  return (
    <div className="producto">
      <Link to={`/producto/${producto.codigo}`}>
        <img src="/img/placeholder.svg" alt={producto.nombre} />
        <h3>{producto.nombre}</h3>
      </Link>
      <p>{producto.marca} - {producto.subcategoria}</p>
      <Precio
        valor={precioFinal(producto)}
        original={producto.precioVenta}
        mostrarDescuento={esOferta(producto)}
      />
      <EtiquetaStock stock={producto.stock} stockMinimo={producto.stockMinimo} />
      <Boton onClick={() => agregar(producto.codigo)} disabled={producto.stock === 0}>
        Agregar al carrito
      </Boton>
    </div>
  )
}