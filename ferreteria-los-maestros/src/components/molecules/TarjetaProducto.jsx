function formatoCLP(valor) {
  return '$' + valor.toLocaleString('es-CL')
}

export default function TarjetaProducto({ producto }) {
  const bajoStock = producto.stock <= producto.stockMinimo

  return (
    <div className="producto">
      <img src="/img/placeholder.svg" alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.marca} - {producto.subcategoria}</p>
      <p className="precio">{formatoCLP(producto.precioVenta)}</p>
      <p className={'stock' + (bajoStock ? ' bajo' : '')}>Stock: {producto.stock}</p>
    </div>
  )
}
