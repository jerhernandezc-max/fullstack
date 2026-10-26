import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PlantillaAdmin from './components/templates/plantillaAdmin'
import PlantillaPublica from './components/templates/plantillaPublica'
import { TiendaProvider } from './context/tiendaContext'
import AdminInventario from './pages/adminInventario'
import AdminPedidos from './pages/adminPedidos'
import CarritoCotizacion from './pages/carritoCotizacion'
import Catalogo from './pages/catalogo'
import Categorias from './pages/categoria'
import Contacto from './pages/contacto'
import DetalleProducto from './pages/detalleProducto'
import Inicio from './pages/pages'
import LoginRegistro from './pages/loginRegistro'
import MisCompras from './pages/micompra'
import Ofertas from './pages/ofertas'
import PedidoResultado from './pages/pedidoResultado'

export default function App() {
  return (
    <TiendaProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PlantillaPublica />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/producto/:codigo" element={<DetalleProducto />} />
            <Route path="/carrito" element={<CarritoCotizacion />} />
            <Route path="/pedido-resultado" element={<PedidoResultado />} />
            <Route path="/mis-compras" element={<MisCompras />} />
            <Route path="/login" element={<LoginRegistro />} />
            <Route path="/contacto" element={<Contacto />} />
          </Route>

          <Route path="/admin" element={<PlantillaAdmin />}>
            <Route index element={<AdminInventario />} />
            <Route path="pedidos" element={<AdminPedidos />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TiendaProvider>
  )
}