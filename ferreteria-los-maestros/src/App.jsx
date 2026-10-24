import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TiendaProvider } from './context/tiendaContext'
import Template from './components/templates/template'
import { Catalogo, Contacto, Inicio } from './pages/pages'

export default function App() {
  return (
    <TiendaProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Template />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/contacto" element={<Contacto />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TiendaProvider>
  )
}
