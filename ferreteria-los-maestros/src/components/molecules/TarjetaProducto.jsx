import EtiquetaStock from '../atoms/etiquetaStock'

function formatoCLP(valor) {
  return '$' + valor.toLocaleString('es-CL')
}

export default function TarjetaProducto({ producto }) {
  return (
    <div className="producto">
      <img src="/img/placeholder.svg" alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.marca} - {producto.subcategoria}</p>
      <p className="precio">{formatoCLP(producto.precioVenta)}</p>
      <EtiquetaStock stock={producto.stock} stockMinimo={producto.stockMinimo} />
    </div>
  )
}
