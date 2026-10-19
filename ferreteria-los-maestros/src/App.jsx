import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Template from './components/templates/template'
import { Catalogo, Contacto, Inicio } from './pages/pages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Template />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
