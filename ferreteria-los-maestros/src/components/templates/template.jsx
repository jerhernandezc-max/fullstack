import { NavLink, Outlet } from 'react-router-dom'

export default function Template() {
  return (
    <>
      <header>
        <h1>Ferretería Los Maestros</h1>
        <nav>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/catalogo">Catálogo</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Ferretería Los Maestros - La Serena, Región de Coquimbo</p>
        <p>© 2026 Ferretería Los Maestros</p>
      </footer>
    </>
  )
}
