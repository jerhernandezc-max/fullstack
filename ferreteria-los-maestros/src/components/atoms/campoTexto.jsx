export default function CampoTexto({ error, multilinea, className = '', ...props }) {
  
  const Etiqueta = multilinea ? 'textarea' : 'input'
  const clase = `${error ? 'campo-error' : ''} ${className}`.trim()
  
  return <Etiqueta className={clase || undefined} aria-invalid={error ? true : undefined} {...props} />
}