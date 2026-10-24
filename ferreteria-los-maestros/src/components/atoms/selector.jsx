export default function Selector({ opciones, placeholder, error, ...props }) {
  return (
    <select className={error ? 'campo-error' : undefined} aria-invalid={error ? true : undefined} {...props}>
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {opciones.map((o) => {
        const valor = typeof o === 'string' ? o : o.valor
        const etiqueta = typeof o === 'string' ? o : o.etiqueta
        return <option key={valor} value={valor}>{etiqueta}</option>
      })}
    </select>
  )
}