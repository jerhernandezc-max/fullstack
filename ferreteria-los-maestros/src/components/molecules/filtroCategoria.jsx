import Selector from '../atoms/selector'

export default function FiltroCategoria({ categorias, valor, onChange }) {
  return (
    <Selector
      aria-label="Filtrar por categoría"
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Todas las categorías"
      opciones={categorias}
    />
  )
}