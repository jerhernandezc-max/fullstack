import { formatoCLP } from '../../utils/precios'

export default function Precio({ valor, original }) {
  
  return (
    
    <span className="precio">
      {original > valor && <s className="precio-original">{formatoCLP(original)}</s>}   // "original" es opcional: si es mayor que "valor" se muestra tachado (oferta).
      {formatoCLP(valor)}
    </span>
  )
}