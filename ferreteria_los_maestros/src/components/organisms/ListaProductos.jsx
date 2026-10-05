import TarjetaProductoCompleta from '../molecules/TarjetaProductoCompleta';

const productos = [
  { id: 1, nombre: 'cemento polpaico', carrera: 'polpaico' },
  { id: 2, nombre: 'test', carrera: 'test' },
  { id: 3, nombre: 'prueba', carrera: 'prueba' },
];

function ListaProductos() {
  return (
    <div className="lista-productos">
      {productos.map((producto) => (
        <TarjetaProductoCompleta
          key={producto.id}
          nombre={producto.nombre}
          carrera={producto.carrera}
        />
      ))}
    </div>
  );
}

export default ListaProductos;