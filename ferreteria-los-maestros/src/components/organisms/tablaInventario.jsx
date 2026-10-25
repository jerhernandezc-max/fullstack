import FilaInventario from '../molecules/filaInventario'

export default function TablaInventario({ productos, onEditar, onEliminar }) {
  return (
    <div className="tabla-scroll">
      <table className="tabla">
        <thead>
          <tr>
            <th>Código</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <FilaInventario key={p.codigo} producto={p} onEditar={onEditar} onEliminar={onEliminar} />
          ))}
        </tbody>
      </table>
    </div>
  )
}