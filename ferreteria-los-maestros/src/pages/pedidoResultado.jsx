import { Navigate, useLocation } from 'react-router-dom'
import Boton from '../components/atoms/boton'
import Descripcion from '../components/atoms/descripcion'
import ResumenPedido from '../components/organisms/resumenPedido'

// Recibe el resultado de crearPedido() por location.state:
//   { ok: true, pedido } o { ok: false, motivo }
export default function PedidoResultado() {
  const { state } = useLocation()

  if (!state) return <Navigate to="/" replace />

  if (!state.ok) {
    return (
      <section className="resultado">
        <h2>Pedido no realizado</h2>
        <Descripcion className="mensaje-error">{state.motivo}</Descripcion>
        <div className="botones">
          <Boton to="/carrito">Volver al carrito</Boton>
          <Boton to="/catalogo" variante="secundario">Seguir comprando</Boton>
        </div>
      </section>
    )
  }

  const { pedido } = state
  return (
    <section className="resultado">
      <h2>{pedido.tipo === 'Pedido' ? '¡Pedido confirmado!' : '¡Cotización enviada!'}</h2>
      <Descripcion>
        Código <strong>{pedido.id}</strong> · {pedido.entrega}
        {pedido.direccion && ` (${pedido.direccion})`}
      </Descripcion>
      <ResumenPedido items={pedido.items} total={pedido.total} />
      <div className="botones">
        <Boton to="/mis-compras">Ver mis compras</Boton>
        <Boton to="/catalogo" variante="secundario">Seguir comprando</Boton>
      </div>
    </section>
  )
}