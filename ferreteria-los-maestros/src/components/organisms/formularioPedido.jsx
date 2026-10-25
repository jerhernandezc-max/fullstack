import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTienda } from '../../context/tiendaContext'
import Boton from '../atoms/boton'
import CampoFormulario from '../molecules/campoFormulario'

export default function FormularioPedido() {
  const { usuario, lineas, crearPedido } = useTienda()
  const navigate = useNavigate()
  const [valores, setValores] = useState({
    tipo: 'Pedido',
    entrega: 'Retiro en tienda',
    direccion: '',
    nota: '',
  })
  const [errores, setErrores] = useState({})

  const cambiar = (e) => setValores({ ...valores, [e.target.id]: e.target.value })

  if (!usuario) {
    return (
      <p>
        Para confirmar necesitas{' '}
        <Link to="/login" state={{ desde: '/carrito' }}>iniciar sesión</Link>.
      </p>
    )
  }

  function enviar(e) {
    e.preventDefault()
    const nuevos = {}
    if (valores.entrega === 'Despacho a domicilio' && valores.direccion.trim() === '') {
      nuevos.direccion = 'Ingresa la dirección de despacho.'
    }
    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) return

    const resultado = crearPedido(valores)
    navigate('/pedido-resultado', { state: resultado })
  }

  return (
    <form onSubmit={enviar} noValidate>
      <CampoFormulario
        id="tipo"
        label="¿Qué quieres hacer?"
        value={valores.tipo}
        onChange={cambiar}
        opciones={[
          { valor: 'Pedido', etiqueta: 'Confirmar pedido (reserva el stock)' },
          { valor: 'Cotización', etiqueta: 'Solo cotizar (no reserva stock)' },
        ]}
      />
      <CampoFormulario
        id="entrega"
        label="Entrega"
        value={valores.entrega}
        onChange={cambiar}
        opciones={['Retiro en tienda', 'Despacho a domicilio']}
      />
      {valores.entrega === 'Despacho a domicilio' && (
        <CampoFormulario
          id="direccion"
          label="Dirección de despacho"
          value={valores.direccion}
          onChange={cambiar}
          error={errores.direccion}
        />
      )}
      <CampoFormulario id="nota" label="Nota (opcional)" multilinea value={valores.nota} onChange={cambiar} />

      <Boton type="submit" disabled={lineas.length === 0}>
        {valores.tipo === 'Pedido' ? 'Confirmar pedido' : 'Enviar cotización'}
      </Boton>
    </form>
  )
}