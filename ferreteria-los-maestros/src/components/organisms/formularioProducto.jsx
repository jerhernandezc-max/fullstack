import { useState } from 'react'
import Boton from '../atoms/boton'
import CampoFormulario from '../molecules/campoFormulario'

const camposTexto = [
  ['codigo', 'Código'],
  ['categoria', 'Categoría'],
  ['subcategoria', 'Subcategoría'],
  ['nombre', 'Nombre'],
  ['marca', 'Marca'],
  ['unidad', 'Unidad (Saco, Unidad, Caja...)'],
]
const camposNumero = [
  ['precioCompra', 'Precio de compra'],
  ['precioVenta', 'Precio de venta'],
  ['stock', 'Stock'],
  ['stockMinimo', 'Stock mínimo'],
]
const obligatorios = ['codigo', 'categoria', 'nombre', 'marca']

const vacio = {
  codigo: '', categoria: '', subcategoria: '', nombre: '', marca: '', unidad: '',
  precioCompra: '', precioVenta: '', stock: '', stockMinimo: '',
}

// producto = null → crear. producto = {...} → editar (el código no se puede cambiar).
export default function FormularioProducto({ producto, categorias, onGuardar, onCancelar }) {
  const editando = Boolean(producto)
  const [valores, setValores] = useState(producto ?? vacio)
  const [errores, setErrores] = useState({})

  const cambiar = (e) => setValores({ ...valores, [e.target.id]: e.target.value })

  function enviar(e) {
    e.preventDefault()
    const nuevos = {}

    obligatorios.forEach((c) => {
      if (String(valores[c]).trim() === '') nuevos[c] = 'Campo obligatorio.'
    })
    camposNumero.forEach(([c]) => {
      const n = Number(valores[c])
      if (String(valores[c]).trim() === '' || Number.isNaN(n) || n < 0) nuevos[c] = 'Ingresa un número mayor o igual a 0.'
    })
    if (!nuevos.precioCompra && !nuevos.precioVenta && Number(valores.precioVenta) < Number(valores.precioCompra)) {
      nuevos.precioVenta = 'No puede ser menor al precio de compra.'
    }

    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) return

    onGuardar({
      codigo: valores.codigo.trim(),
      categoria: valores.categoria.trim(),
      subcategoria: valores.subcategoria.trim(),
      nombre: valores.nombre.trim(),
      marca: valores.marca.trim(),
      unidad: valores.unidad.trim() || 'Unidad',
      precioCompra: Number(valores.precioCompra),
      precioVenta: Number(valores.precioVenta),
      stock: Number(valores.stock),
      stockMinimo: Number(valores.stockMinimo),
    })
  }

  return (
    <form onSubmit={enviar} noValidate>
      <h3>{editando ? `Editar ${producto.codigo}` : 'Nuevo producto'}</h3>

      {camposTexto.map(([id, label]) => (
        <CampoFormulario
          key={id}
          id={id}
          label={label}
          value={valores[id]}
          onChange={cambiar}
          error={errores[id]}
          disabled={editando && id === 'codigo'}
          list={id === 'categoria' ? 'lista-categorias' : undefined}
        />
      ))}
      <datalist id="lista-categorias">
        {categorias.map((c) => <option key={c} value={c} />)}
      </datalist>

      {camposNumero.map(([id, label]) => (
        <CampoFormulario
          key={id}
          id={id}
          label={label}
          type="number"
          min="0"
          value={valores[id]}
          onChange={cambiar}
          error={errores[id]}
        />
      ))}

      <div className="acciones">
        <Boton type="submit">Guardar</Boton>
        <Boton variante="secundario" onClick={onCancelar}>Cancelar</Boton>
      </div>
    </form>
  )
}