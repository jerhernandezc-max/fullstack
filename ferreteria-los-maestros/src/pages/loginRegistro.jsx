import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Boton from '../components/atoms/boton'
import CampoFormulario from '../components/molecules/campoFormulario'
import { useTienda } from '../context/tiendaContext'

const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginRegistro() {
  const { login, registrar } = useTienda()
  const navigate = useNavigate()
  const { state } = useLocation()

  const [modo, setModo] = useState('login') // 'login' | 'registro'
  const [valores, setValores] = useState({ nombre: '', email: '', password: '' })
  const [errores, setErrores] = useState({})

  const cambiar = (e) => setValores({ ...valores, [e.target.id]: e.target.value })

  function enviar(e) {
    e.preventDefault()
    const nuevos = {}
    if (modo === 'registro' && valores.nombre.trim() === '') nuevos.nombre = 'Ingresa tu nombre.'
    if (!patronCorreo.test(valores.email.trim())) nuevos.email = 'Ingresa un correo válido.'
    if (valores.password.length < 6) nuevos.password = 'Mínimo 6 caracteres.'
    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) return

    const resultado =
      modo === 'login'
        ? login(valores.email, valores.password)
        : registrar({ nombre: valores.nombre.trim(), email: valores.email, password: valores.password })

    if (!resultado.ok) {
      setErrores({ general: resultado.error })
      return
    }
    navigate(state?.desde ?? '/', { replace: true })
  }

  return (
    <section id="login">
      <h2>{modo === 'login' ? 'Ingresar' : 'Crear cuenta'}</h2>

      <form onSubmit={enviar} noValidate>
        {modo === 'registro' && (
          <CampoFormulario id="nombre" label="Nombre" value={valores.nombre} onChange={cambiar} error={errores.nombre} />
        )}
        <CampoFormulario id="email" label="Correo electrónico" type="email" value={valores.email} onChange={cambiar} error={errores.email} />
        <CampoFormulario id="password" label="Contraseña" type="password" value={valores.password} onChange={cambiar} error={errores.password} />

        {errores.general && <p className="mensaje-error">{errores.general}</p>}

        <Boton type="submit">{modo === 'login' ? 'Ingresar' : 'Registrarme'}</Boton>
      </form>

      <p className="cambio-modo">
        {modo === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
        <Boton
          variante="link-oscuro"
          onClick={() => {
            setModo(modo === 'login' ? 'registro' : 'login')
            setErrores({})
          }}
        >
          {modo === 'login' ? 'Regístrate' : 'Ingresa'}
        </Boton>
      </p>
      <p className="nota-demo">Demo: admin@losmaestros.cl / admin123</p>
    </section>
  )
}