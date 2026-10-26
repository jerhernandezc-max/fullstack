import Descripcion from '../components/atoms/descripcion'
import FormularioContacto from '../components/molecules/FormularioContacto'

export default function Contacto() {
  return (
    <section id="contacto">
      <h2>Contacto</h2>
      <Descripcion className="intro">
        ¿No encontraste algo en el catálogo o quieres cotizar un pedido grande? Escríbenos.
      </Descripcion>
      <FormularioContacto />
    </section>
  )
}