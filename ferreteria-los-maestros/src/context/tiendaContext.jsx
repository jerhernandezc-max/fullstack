import { createContext, useContext } from 'react'
import productosIniciales from '../assets/productos'
import useLocalStorage from '../hooks/useLocalStorage'
import { precioFinal } from '../utils/precios'

const TiendaContext = createContext(null)

const adminInicial = {
  nombre: 'Administrador',
  email: 'admin@losmaestros.cl',
  password: 'admin123',
  rol: 'admin',
}

export function TiendaProvider({ children }) {
  const [productos, setProductos] = useLocalStorage('lm_inventario', productosIniciales)
  const [carrito, setCarrito] = useLocalStorage('lm_carrito', []) // [{ codigo, cantidad }]
  const [usuarios, setUsuarios] = useLocalStorage('lm_usuarios', [adminInicial])
  const [sesion, setSesion] = useLocalStorage('lm_sesion', null) // email del usuario activo
  const [pedidos, setPedidos] = useLocalStorage('lm_pedidos', [])

  const usuario = usuarios.find((u) => u.email === sesion) ?? null

  //Carrito
  const lineas = carrito.flatMap((i) => {
    const p = productos.find((x) => x.codigo === i.codigo)
    if (!p) return []
    const precio = precioFinal(p)
    return [{
      codigo: p.codigo,
      nombre: p.nombre,
      marca: p.marca,
      precio,
      precioOriginal: p.precioVenta,
      stock: p.stock,
      cantidad: i.cantidad,
      subtotal: precio * i.cantidad,
    }]
  })
  const totalCarrito = lineas.reduce((suma, l) => suma + l.subtotal, 0)
  const cantidadCarrito = lineas.reduce((suma, l) => suma + l.cantidad, 0)

  function agregar(codigo, cantidad = 1) {
    const p = productos.find((x) => x.codigo === codigo)
    if (!p) return
    setCarrito((actual) => {
      const existe = actual.find((i) => i.codigo === codigo)
      const nueva = Math.min((existe?.cantidad ?? 0) + cantidad, p.stock)
      if (nueva <= 0) return actual
      return existe
        ? actual.map((i) => (i.codigo === codigo ? { ...i, cantidad: nueva } : i))
        : [...actual, { codigo, cantidad: nueva }]
    })
  }

  function cambiarCantidad(codigo, cantidad) {
    const p = productos.find((x) => x.codigo === codigo)
    if (!p) return
    const valida = Math.max(1, Math.min(cantidad, p.stock))
    setCarrito((actual) => actual.map((i) => (i.codigo === codigo ? { ...i, cantidad: valida } : i)))
  }

  const quitar = (codigo) => setCarrito((actual) => actual.filter((i) => i.codigo !== codigo))
  const vaciar = () => setCarrito([])

  // sesion simulada
  function login(email, password) {
    const correo = email.trim().toLowerCase()
    const u = usuarios.find((x) => x.email === correo && x.password === password)
    if (!u) return { ok: false, error: 'Correo o contraseña incorrectos.' }
    setSesion(u.email)
    return { ok: true }
  }

  function registrar({ nombre, email, password }) {
    const correo = email.trim().toLowerCase()
    if (usuarios.some((u) => u.email === correo)) {
      return { ok: false, error: 'Ya existe una cuenta con ese correo.' }
    }
    setUsuarios((actual) => [...actual, { nombre, email: correo, password, rol: 'cliente' }])
    setSesion(correo)
    return { ok: true }
  }

  const logout = () => setSesion(null)

  //pedidos

  function crearPedido({ tipo, entrega, direccion, nota }) {
    if (!usuario) return { ok: false, motivo: 'Debes iniciar sesión.' }
    if (lineas.length === 0) return { ok: false, motivo: 'Tu carrito está vacío.' }

    if (tipo === 'Pedido') {
      const sinStock = lineas.find((l) => l.cantidad > l.stock)
      if (sinStock) {
        return { ok: false, motivo: `No hay stock suficiente de "${sinStock.nombre}" (quedan ${sinStock.stock}).` }
      }
    }

    const pedido = {
      id: 'P-' + String(pedidos.length + 1).padStart(4, '0'),
      fecha: new Date().toISOString(),
      email: usuario.email,
      cliente: usuario.nombre,
      tipo,
      entrega,
      direccion: entrega === 'Despacho a domicilio' ? direccion.trim() : '',
      nota: nota.trim(),
      items: lineas.map(({ codigo, nombre, precio, cantidad }) => ({ codigo, nombre, precio, cantidad })),
      total: totalCarrito,
      estado: 'Pendiente',
    }

    setPedidos((actual) => [pedido, ...actual])
    if (tipo === 'Pedido') {
      // Solo el pedido descuenta stock; la cotización no.
      setProductos((actual) =>
        actual.map((p) => {
          const item = pedido.items.find((i) => i.codigo === p.codigo)
          return item ? { ...p, stock: p.stock - item.cantidad } : p
        }),
      )
    }
    vaciar()
    return { ok: true, pedido }
  }

  function cambiarEstadoPedido(id, estado) {
    const pedido = pedidos.find((p) => p.id === id)
    if (!pedido || pedido.estado === 'Cancelado') return
    if (estado === 'Cancelado' && pedido.tipo === 'Pedido') {
      // Cancelar un pedido devuelve el stock.
      setProductos((actual) =>
        actual.map((p) => {
          const item = pedido.items.find((i) => i.codigo === p.codigo)
          return item ? { ...p, stock: p.stock + item.cantidad } : p
        }),
      )
    }
    setPedidos((actual) => actual.map((p) => (p.id === id ? { ...p, estado } : p)))
  }

  //crud
  
  function guardarProducto(producto, esNuevo) {
    if (esNuevo && productos.some((p) => p.codigo === producto.codigo)) {
      return { ok: false, error: 'Ya existe un producto con ese código.' }
    }
    setProductos((actual) =>
      esNuevo
        ? [...actual, producto]
        : actual.map((p) => (p.codigo === producto.codigo ? producto : p)),
    )
    return { ok: true }
  }

  function eliminarProducto(codigo) {
    setProductos((actual) => actual.filter((p) => p.codigo !== codigo))
    setCarrito((actual) => actual.filter((i) => i.codigo !== codigo))
  }

  const valor = {
    productos, guardarProducto, eliminarProducto,
    lineas, totalCarrito, cantidadCarrito, agregar, cambiarCantidad, quitar, vaciar,
    usuario, login, registrar, logout,
    pedidos, crearPedido, cambiarEstadoPedido,
  }

  return <TiendaContext.Provider value={valor}>{children}</TiendaContext.Provider>
}

export function useTienda() {
  const ctx = useContext(TiendaContext)
  if (!ctx) throw new Error('useTienda debe usarse dentro de <TiendaProvider>')
  return ctx
}