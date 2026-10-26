import Descripcion from '../components/atoms/descripcion'
import Selector from '../components/atoms/selector'
import { useTienda } from '../context/tiendaContext'
import { formatoCLP } from '../utils/precios'

const estados = ['Pendiente', 'Preparando', 'Listo', 'Entregado', 'Cancelado']

export default function AdminPedidos() {
  const { pedidos, cambiarEstadoPedido } = useTienda()

  return (
    <>
      <h2>Pedidos</h2>
      <Descripcion className="intro">
        Cancelar un pedido devuelve el stock al inventario. Un pedido cancelado ya no se puede cambiar.
      </Descripcion>

      {pedidos.length === 0 ? (
        <p className="sin-resultados">Aún no hay pedidos.</p>
      ) : (
        <div className="tabla-scroll">
          <table className="tabla">
            <thead>
              <tr>
                <th>Código</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Entrega</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{new Date(p.fecha).toLocaleDateString('es-CL')}</td>
                  <td>{p.cliente}<br /><small>{p.email}</small></td>
                  <td>{p.tipo}</td>
                  <td>{p.entrega}{p.direccion && <><br /><small>{p.direccion}</small></>}</td>
                  <td>{formatoCLP(p.total)}</td>
                  <td>
                    <Selector
                      aria-label={`Estado del pedido ${p.id}`}
                      value={p.estado}
                      disabled={p.estado === 'Cancelado'}
                      onChange={(e) => cambiarEstadoPedido(p.id, e.target.value)}
                      opciones={estados}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}