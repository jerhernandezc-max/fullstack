function TarjetaProducto(props) {
  return (
    <div className="tarjeta-producto">
      <h3>{props.nombre}</h3>
      <p>{props.marca}</p>
    </div>
  );
}

export default TarjetaProducto;