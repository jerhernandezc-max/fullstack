import Descripcion from '../components/atoms/descripcion'
import CatalogoProductos from '../components/organisms/catalogoProductos'
import { useTienda } from '../context/tiendaContext'
import { DESCUENTO_OFERTA, esOferta } from '../utils/precios'

export default function Ofertas() {
  const { productos } = useTienda()

  return (
    <section id="ofertas">
      <h2>Ofertas</h2>
      <Descripcion className="intro">
        {Math.round(DESCUENTO_OFERTA * 100)}% de descuento en productos con sobrestock.
      </Descripcion>
      <CatalogoProductos productos={productos.filter(esOferta)} />
    </section>
  )
}