import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTienda } from '../../context/tiendaContext'
import Boton from '../atoms/boton'

export default function Navbar() {
  const { usuario, logout, cantidadCarrito } = useTienda()
  const navigate = useNavigate()
  const [abierto, setAbierto] = useState(false)

  function salir() {
    logout()
    navigate('/')
  }

  return (
    <header>
      <h1>Ferretería Los Maestros</h1>
      <button
        type="button"
        className="menu-toggle"
        aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={abierto}
        aria-controls="menu-principal"
        onClick={() => setAbierto(!abierto)}
      >
        {abierto ? '✕' : '☰'}
      </button>
      <nav id="menu-principal" className={abierto ? 'abierto' : undefined} onClick={() => setAbierto(false)}>
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/catalogo">Catálogo</NavLink>
        <NavLink to="/categorias">Categorías</NavLink>
        <NavLink to="/ofertas">Ofertas</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
        <NavLink to="/carrito">Carrito ({cantidadCarrito})</NavLink>
        {usuario ? (
          <>
            <NavLink to="/mis-compras">Mis compras</NavLink>
            {usuario.rol === 'admin' && <NavLink to="/admin">Admin</NavLink>}
            <Boton variante="link" onClick={salir}>Salir ({usuario.nombre})</Boton>
          </>
        ) : (
          <NavLink to="/login">Ingresar</NavLink>
        )}
      </nav>
    </header>
  )
}