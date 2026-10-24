import { formatoCLP } from '../../utils/precios'

export default function Precio({ valor, original, mostrarDescuento = false }) {
  const porcentajeDescuento = original > valor
    ? Math.round(((original - valor) / original) * 100)
    : 0

  return (
    <span className="precio">
      <span className="precio-actual">{formatoCLP(valor)}</span>
      {original > valor && (
        <span className="precio-original-linea">
          <s className="precio-original">{formatoCLP(original)}</s>
          {mostrarDescuento && (
            <span className="insignia-oferta">-{porcentajeDescuento}%</span>
          )}
        </span>
      )}
    </span>
  )
}