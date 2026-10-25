import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTienda } from '../../context/tiendaContext'
import CampoTexto from '../atoms/campoTexto'
import FiltroCategoria from '../molecules/filtroCategoria'
import TarjetaProducto from '../molecules/TarjetaProducto'

export default function CatalogoProductos({ productos: lista }) {
  const { productos } = useTienda()
  const base = lista ?? productos

  const [searchParams] = useSearchParams()
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState(searchParams.get('categoria') || '')

  const categorias = [...new Set(base.map((p) => p.categoria))].sort()
  const busqueda = texto.trim().toLowerCase()

  const filtrados = base.filter((p) => {
    const coincideCategoria = categoria === '' || p.categoria === categoria
    const coincideTexto =
      busqueda === '' ||
      p.nombre.toLowerCase().includes(busqueda) ||
      p.marca.toLowerCase().includes(busqueda)
    return coincideCategoria && coincideTexto
  })

  return (
    <>
      <div className="controles-catalogo">
        <CampoTexto
          type="search"
          placeholder="Buscar producto..."
          aria-label="Buscar producto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <FiltroCategoria categorias={categorias} valor={categoria} onChange={setCategoria} />
      </div>

      <p id="resultado-conteo">{filtrados.length} de {base.length} productos</p>

      <div className="grilla-productos">
        {filtrados.map((p) => (
          <TarjetaProducto key={p.codigo} producto={p} />
        ))}
      </div>
      {filtrados.length === 0 && <p className="sin-resultados">No se encontraron productos.</p>}
    </>
  )
}