import Descripcion from '../components/atoms/descripcion'
import Carrito from '../components/organisms/carrito'
import FormularioPedido from '../components/organisms/formularioPedido'
import ResumenPedido from '../components/organisms/resumenPedido'
import { useTienda } from '../context/tiendaContext'

export default function CarritoCotizacion() {
  const { lineas, totalCarrito } = useTienda()

  return (
    <section id="carrito">
      <h2>Carrito o cotización</h2>
      <Descripcion className="intro">
        Confirma un pedido (reserva el stock) o solo pide una cotización (no reserva nada).
      </Descripcion>

      <Carrito />

      {lineas.length > 0 && (
        <div className="checkout">
          <FormularioPedido />
          <ResumenPedido items={lineas} total={totalCarrito} />
        </div>
      )}
    </section>
  )
}