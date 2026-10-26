import { Link } from 'react-router-dom'
import Boton from '../components/atoms/boton'
import Descripcion from '../components/atoms/descripcion'

const categorias = [
  ['Mat. Construcción', 'Materiales de construcción'],
  ['Pinturas', 'Pinturas'],
  ['Herramientas', 'Herramientas'],
  ['Gasfitería', 'Gasfitería'],
  ['Electricidad', 'Electricidad'],
  ['Tornillería', 'Tornillería'],
  ['Madera', 'Madera'],
  ['Seguridad', 'Seguridad'],
  ['Jardín', 'Jardín'],
]

export default function Inicio() {
  return (
    <>
      <section className="hero">
        <h2>Materiales de construcción y ferretería general</h2>
        <Descripcion>
          Negocio familiar ubicado en La Serena, con 22 años de trayectoria. Vendemos materiales
          de construcción, herramientas, pinturas, gasfitería, electricidad y ferretería en general.
        </Descripcion>
        <div className="botones">
          <Boton to="/catalogo">Ver catálogo</Boton>
          <Boton to="/ofertas" variante="secundario">Ver ofertas</Boton>
        </div>
      </section>

      <section id="categorias">
        <h2>Categorías del catálogo</h2>
        <ul className="lista-categorias">
          {categorias.map(([valor, etiqueta]) => (
            <li key={valor}>
              <Link to={`/catalogo?categoria=${encodeURIComponent(valor)}`}>{etiqueta}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="clientes">
        <h2>Nuestros clientes</h2>
        <Descripcion>
          Atendemos a clientes particulares que compran para su hogar, y a contratistas o maestros
          de obra que compran con mayor frecuencia y en volúmenes más grandes.
        </Descripcion>
      </section>
    </>
  )
}