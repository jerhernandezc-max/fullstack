import React from 'react';

function TarjetaProductoCompleta({ nombre, marca }) {
  const tarjetaEstilo = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '27%'
  };

  return (
    <div style={tarjetaEstilo}>
      <h3 style={{ margin: '0 0 8px 0', textTransform: 'capitalize' }}>
        {nombre}
      </h3>
      <p style={{ margin: 0, color: '#666' }}>
        Marca: <strong style={{ textTransform: 'uppercase' }}>{marca}</strong>
      </p>
    </div>
  );
}

export default TarjetaProductoCompleta;