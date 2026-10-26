import { Navigate } from 'react-router-dom'
import Boton from '../components/atoms/boton'
import Descripcion from '../components/atoms/descripcion'
import ResumenPedido from '../components/organisms/resumenPedido'
import { useTienda } from '../context/tiendaContext'
import { formatoCLP } from '../utils/precios'

export default function MisCompras() {
  const { usuario, pedidos } = useTienda()

  if (!usuario) return <Navigate to="/login" replace state={{ desde: '/mis-compras' }} />

  const mios = pedidos.filter((p) => p.email === usuario.email)

  return (
    <section id="mis-compras">
      <h2>Mis compras</h2>

      {mios.length === 0 ? (
        <>
          <Descripcion className="intro">Todavía no tienes pedidos ni cotizaciones.</Descripcion>
          <Boton to="/catalogo">Ir al catálogo</Boton>
        </>
      ) : (
        <ul className="lista-pedidos">
          {mios.map((p) => (
            <li key={p.id}>
              <details>
                <summary>
                  <strong>{p.id}</strong> · {new Date(p.fecha).toLocaleDateString('es-CL')} ·{' '}
                  {p.tipo} · {p.estado} · {formatoCLP(p.total)}
                </summary>
                <ResumenPedido items={p.items} total={p.total} titulo={p.entrega} />
              </details>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}