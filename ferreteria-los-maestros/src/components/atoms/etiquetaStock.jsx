export default function EtiquetaStock({ stock, stockMinimo }) {
  const bajoStock = stock <= stockMinimo

  return (
    <span className={`etiqueta-stock${bajoStock ? ' etiqueta-stock--bajo' : ''}`}>
      {bajoStock ? 'Stock bajo' : 'Stock'}: {stock}
    </span>
  )
}
