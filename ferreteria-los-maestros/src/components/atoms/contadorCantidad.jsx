export default function ContadorCantidad({ valor, onChange, min = 1, max = 99 }) {
  return (
    <div className="contador">
      <button type="button" onClick={() => onChange(valor - 1)} disabled={valor <= min} aria-label="Restar uno">−</button>
      <span>{valor}</span>
      <button type="button" onClick={() => onChange(valor + 1)} disabled={valor >= max} aria-label="Sumar uno">+</button>
    </div>
  )
}