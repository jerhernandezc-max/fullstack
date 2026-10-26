import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Boton from '../components/atoms/boton'
import ContadorCantidad from '../components/atoms/contadorCantidad'
import Descripcion from '../components/atoms/descripcion'
import EtiquetaStock from '../components/atoms/etiquetaStock'
import Precio from '../components/atoms/precio'
import { useTienda } from '../context/tiendaContext'
import { precioFinal } from '../utils/precios'

export default function DetalleProducto() {
  const { codigo } = useParams()
  const { productos, agregar } = useTienda()
  const [cantidad, setCantidad] = useState(1)

  const p = productos.find((x) => x.codigo === codigo)

  if (!p) {
    return (
      <section>
        <h2>Producto no encontrado</h2>
        <Boton to="/catalogo">Volver al catálogo</Boton>
      </section>
    )
  }

  return (
    <section className="detalle">
      <img src="/img/placeholder.svg" alt={p.nombre} />
      <div>
        <h2>{p.nombre}</h2>
        <Descripcion>
          {p.marca} · {p.categoria} / {p.subcategoria} · Unidad de venta: {p.unidad}
        </Descripcion>
        <p><Precio valor={precioFinal(p)} original={p.precioVenta} /></p>
        <p><EtiquetaStock stock={p.stock} stockMinimo={p.stockMinimo} /></p>

        {p.stock > 0 && (
          <div className="detalle-compra">
            <ContadorCantidad valor={cantidad} max={p.stock} onChange={setCantidad} />
            <Boton onClick={() => agregar(p.codigo, cantidad)}>Agregar al carrito</Boton>
          </div>
        )}
        <Boton to="/catalogo" variante="secundario">← Volver al catálogo</Boton>
      </div>
    </section>
  )
}