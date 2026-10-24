import CampoTexto from '../atoms/campoTexto'
import Selector from '../atoms/selector'

// etiqueta + campo+ mensaje de error.

// Si recibe opciones dibuja un selector sino un ./CampoTexto.
export default function CampoFormulario({ id, label, error, opciones, placeholder, ...props }) {
  return (
    <div className="campo">
      <label htmlFor={id}>{label}</label>
      {opciones ? (
        <Selector id={id} opciones={opciones} placeholder={placeholder} error={error} {...props} />
      ) : (
        <CampoTexto id={id} error={error} placeholder={placeholder} {...props} />
      )}
      {error && <small className="mensaje-error">{error}</small>}
    </div>
  )
}