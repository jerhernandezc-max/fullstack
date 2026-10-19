import { useEffect, useState } from 'react'
import { cargarProductos } from '../../assets/productos'
import { useSearchParams } from 'react-router-dom'
import TarjetaProducto from '../molecules/TarjetaProducto'



export default function Productos() {
  const [searchParams] = useSearchParams()
  const [productos, setProductos] = useState([])
   useEffect(() => {
     cargarProductos().then(setProductos)
    }, [])
    
  const categorias = [...new Set(productos.map((p) => p.categoria))].sort()
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState(searchParams.get('categoria') || 'Todas')

  const busqueda = texto.trim().toLowerCase()
  const filtrados = productos.filter((p) => {
    const coincideCategoria = categoria === 'Todas' || p.categoria === categoria
    const coincideTexto =
      busqueda === '' ||
      p.nombre.toLowerCase().includes(busqueda) ||
      p.marca.toLowerCase().includes(busqueda)
    return coincideCategoria && coincideTexto
  })

  return (
    <>
      <div className="controles-catalogo">
        <input
          type="search"
          placeholder="Buscar producto..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="Todas">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <p id="resultado-conteo">{filtrados.length} de {productos.length} productos</p>

      <div className="grilla-productos">
        {filtrados.map((p) => (
          <TarjetaProducto key={p.codigo} producto={p} />
        ))}
      </div>
      {filtrados.length === 0 && <p className="sin-resultados">No se encontraron productos.</p>}
    </>
  )
}
