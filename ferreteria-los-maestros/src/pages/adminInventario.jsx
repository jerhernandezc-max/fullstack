import { useState } from 'react'
import Boton from '../components/atoms/boton'
import CampoTexto from '../components/atoms/campoTexto'
import FormularioProducto from '../components/organisms/formularioProducto'
import TablaInventario from '../components/organisms/tablaInventario'
import { useTienda } from '../context/tiendaContext'

export default function AdminInventario() {
  const { productos, guardarProducto, eliminarProducto } = useTienda()
  const [editando, setEditando] = useState(null) //
  const [busqueda, setBusqueda] = useState('')
  const [error, setError] = useState('')

  const categorias = [...new Set(productos.map((p) => p.categoria))].sort()
  const texto = busqueda.trim().toLowerCase()
  const visibles = productos.filter(
    (p) => texto === '' || p.nombre.toLowerCase().includes(texto) || p.codigo.toLowerCase().includes(texto),
  )

  function guardar(producto) {
    const resultado = guardarProducto(producto, editando === 'nuevo')
    if (!resultado.ok) {
      setError(resultado.error)
      return
    }
    setError('')
    setEditando(null)
  }

  function eliminar(p) {
    if (window.confirm(`¿Eliminar "${p.nombre}" del inventario?`)) eliminarProducto(p.codigo)
  }

  if (editando) {
    return (
      <>
        <h2>Inventario</h2>
        {error && <p className="mensaje-error">{error}</p>}
        <FormularioProducto
          key={editando === 'nuevo' ? 'nuevo' : editando.codigo}
          producto={editando === 'nuevo' ? null : editando}
          categorias={categorias}
          onGuardar={guardar}
          onCancelar={() => { setEditando(null); setError('') }}
        />
      </>
    )
  }

  return (
    <>
      <h2>Inventario</h2>
      <div className="controles-catalogo">
        <CampoTexto
          type="search"
          placeholder="Buscar por nombre o código..."
          aria-label="Buscar en inventario"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <Boton onClick={() => setEditando('nuevo')}>+ Nuevo producto</Boton>
      </div>
      <p id="resultado-conteo">{visibles.length} de {productos.length} productos</p>
      <TablaInventario productos={visibles} onEditar={setEditando} onEliminar={eliminar} />
    </>
  )
}