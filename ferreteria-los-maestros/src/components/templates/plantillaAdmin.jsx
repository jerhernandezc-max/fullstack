import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useTienda } from '../../context/tiendaContext'
import Boton from '../atoms/boton'

export default function PlantillaAdmin() {
  const { usuario, logout } = useTienda()

  if (!usuario) return <Navigate to="/login" replace state={{ desde: '/admin' }} />
  if (usuario.rol !== 'admin') return <Navigate to="/" replace />

  return (
    <div className="admin">
      <aside className="admin-menu">
        <h2>Panel admin</h2>
        <NavLink to="/admin" end>Inventario</NavLink>
        <NavLink to="/admin/pedidos">Pedidos</NavLink>
        <NavLink to="/">← Volver a la tienda</NavLink>
        <Boton variante="link" onClick={logout}>Salir</Boton>
      </aside>
      <section className="admin-contenido">
        <Outlet />
      </section>
    </div>
  )
}