import Descripcion from '../components/atoms/descripcion'
import CatalogoProductos from '../components/organisms/catalogoProductos'

export default function Catalogo() {
  return (
    <section id="catalogo">
      <h2>Catálogo de productos</h2>
      <Descripcion className="intro">
        Precios en pesos chilenos (CLP). Consulta el stock antes de venir a retirar.
      </Descripcion>
      <CatalogoProductos />
    </section>
  )
}