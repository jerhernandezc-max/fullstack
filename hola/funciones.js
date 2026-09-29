// Ferretería Los Maestros - lógica del catálogo y del formulario de contacto

function formatoCLP(valor) {
  return '$' + valor.toLocaleString('es-CL');
}

// --- Catálogo (catalogo.html) ---
const grillaProductos = document.querySelector('#grilla-productos');

if (grillaProductos && typeof productos !== 'undefined') {
  const selectCategoria = document.querySelector('#filtro-categoria');
  const buscador = document.querySelector('#buscador');
  const resultadoConteo = document.querySelector('#resultado-conteo');
  const sinResultados = document.querySelector('#sin-resultados');

  const categorias = [...new Set(productos.map(function (p) { return p.categoria; }))].sort();

  const opcionTodas = document.createElement('option');
  opcionTodas.value = 'Todas';
  opcionTodas.textContent = 'Todas las categorías';
  selectCategoria.appendChild(opcionTodas);

  categorias.forEach(function (cat) {
    const opcion = document.createElement('option');
    opcion.value = cat;
    opcion.textContent = cat;
    selectCategoria.appendChild(opcion);
  });

  const parametros = new URLSearchParams(window.location.search);
  const categoriaUrl = parametros.get('categoria');
  if (categoriaUrl) {
    selectCategoria.value = categoriaUrl;
  }

  function crearTarjetaProducto(producto) {
    const div = document.createElement('div');
    div.className = 'producto';

    const bajoStock = producto.stock <= producto.stockMinimo;

    div.innerHTML =
      '<img src="img/placeholder.svg" alt="' + producto.nombre + '">' +
      '<h3>' + producto.nombre + '</h3>' +
      '<p>' + producto.marca + ' - ' + producto.subcategoria + '</p>' +
      '<p class="precio">' + formatoCLP(producto.precioVenta) + '</p>' +
      '<p class="stock' + (bajoStock ? ' bajo' : '') + '">Stock: ' + producto.stock + '</p>';

    return div;
  }

  function renderizarProductos() {
    const texto = buscador.value.trim().toLowerCase();
    const categoria = selectCategoria.value || 'Todas';

    const filtrados = productos.filter(function (producto) {
      const coincideCategoria = categoria === 'Todas' || producto.categoria === categoria;
      const coincideTexto = texto === '' ||
        producto.nombre.toLowerCase().indexOf(texto) !== -1 ||
        producto.marca.toLowerCase().indexOf(texto) !== -1;
      return coincideCategoria && coincideTexto;
    });

    grillaProductos.innerHTML = '';
    filtrados.forEach(function (producto) {
      grillaProductos.appendChild(crearTarjetaProducto(producto));
    });

    resultadoConteo.textContent = filtrados.length + ' de ' + productos.length + ' productos';
    sinResultados.hidden = filtrados.length !== 0;
  }

  buscador.addEventListener('input', renderizarProductos);
  selectCategoria.addEventListener('change', renderizarProductos);
  renderizarProductos();
}

// --- Formulario de contacto (contacto.html) ---
const formulario = document.querySelector('#form-contacto');

if (formulario) {
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const camposRequeridos = formulario.querySelectorAll('[required]');
    let formularioValido = true;

    camposRequeridos.forEach(function (campo) {
      if (campo.value.trim() === '') {
        campo.classList.add('campo-error');
        formularioValido = false;
      } else {
        campo.classList.remove('campo-error');
      }
    });

    const correo = document.querySelector('#correo');
    if (!patronCorreo.test(correo.value.trim())) {
      correo.classList.add('campo-error');
      formularioValido = false;
    }

    const mensajeConfirmacion = document.querySelector('#mensaje-confirmacion');
    mensajeConfirmacion.textContent = formularioValido
      ? '¡Gracias! Recibimos tu consulta.'
      : '';
  });
}
