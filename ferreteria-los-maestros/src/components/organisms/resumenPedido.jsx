import { formatoCLP } from '../../utils/precios'

// items: [{ codigo, nombre, precio, cantidad }]


export default function ResumenPedido({ items, total, titulo = 'Resumen' }) {
  return (
    <aside className="resumen">
      <h3>{titulo}</h3>
      <ul>
        {items.map((i) => (
          <li key={i.codigo}>
            <span>{i.cantidad} × {i.nombre}</span>
            <span>{formatoCLP(i.precio * i.cantidad)}</span>
          </li>
        ))}
      </ul>
      <p className="resumen-total">
        <span>Total</span>
        <strong>{formatoCLP(total)}</strong>
      </p>
    </aside>
  )
}