import { useState } from 'react'

const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const requeridos = ['nombre', 'correo', 'tipoCliente', 'motivo', 'mensaje']
const inicial = { nombre: '', correo: '', telefono: '', tipoCliente: '', motivo: '', mensaje: '' }

export default function FormularioContacto() {
  const [valores, setValores] = useState(inicial)
  const [errores, setErrores] = useState({})
  const [confirmacion, setConfirmacion] = useState('')

  function cambiar(e) {
    setValores({ ...valores, [e.target.id]: e.target.value })
  }

  function enviar(e) {
    e.preventDefault()
    const nuevos = {}
    requeridos.forEach((campo) => {
      if (valores[campo].trim() === '') nuevos[campo] = true
    })
    if (!patronCorreo.test(valores.correo.trim())) nuevos.correo = true

    setErrores(nuevos)
    setConfirmacion(Object.keys(nuevos).length === 0 ? '¡Gracias! Recibimos tu consulta.' : '')
  }

  const clase = (campo) => (errores[campo] ? 'campo-error' : undefined)

  return (
    <form onSubmit={enviar} noValidate>
      <label htmlFor="nombre">Nombre completo</label>
      <input type="text" id="nombre" value={valores.nombre} onChange={cambiar} className={clase('nombre')} />

      <label htmlFor="correo">Correo electrónico</label>
      <input type="email" id="correo" value={valores.correo} onChange={cambiar} className={clase('correo')} />

      <label htmlFor="telefono">Teléfono</label>
      <input type="tel" id="telefono" value={valores.telefono} onChange={cambiar} />

      <label htmlFor="tipoCliente">Tipo de cliente</label>
      <select id="tipoCliente" value={valores.tipoCliente} onChange={cambiar} className={clase('tipoCliente')}>
        <option value="">Selecciona una opción</option>
        <option>Cliente particular</option>
        <option>Contratista / maestro de obra</option>
        <option>Contratista con cuenta corriente</option>
      </select>

      <label htmlFor="motivo">Motivo de la consulta</label>
      <select id="motivo" value={valores.motivo} onChange={cambiar} className={clase('motivo')}>
        <option value="">Selecciona una opción</option>
        <option>Consulta de stock</option>
        <option>Cotización de pedido</option>
        <option>Despacho a domicilio</option>
        <option>Cuenta corriente</option>
        <option>Otro</option>
      </select>

      <label htmlFor="mensaje">Mensaje</label>
      <textarea id="mensaje" value={valores.mensaje} onChange={cambiar} className={clase('mensaje')} />

      <button type="submit">Enviar consulta</button>
      <p id="mensaje-confirmacion">{confirmacion}</p>
    </form>
  )
}
