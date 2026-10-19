import * as XLSX from 'xlsx'
import archivo from './DSY1104.xlsx?url'

const limpiar = (texto) =>
  String(texto)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

export async function cargarProductos() {
  const respuesta = await fetch(archivo)
  const libro = XLSX.read(await respuesta.arrayBuffer())
  const hoja = libro.Sheets[libro.SheetNames[0]]

  const matriz = XLSX.utils.sheet_to_json(hoja, { header: 1 })

  const filaEncabezado = matriz.findIndex((fila) => fila.some((celda) => limpiar(celda) === 'codigo'))

  const filas = XLSX.utils.sheet_to_json(hoja, { range: Math.max(filaEncabezado, 0) })

  console.log('Encabezados leídos:', Object.keys(filas[0] || {}))

  return filas.map((original) => {
    const fila = {}
    Object.keys(original).forEach((clave) => {
      fila[limpiar(clave)] = original[clave]
    })

    return {
      codigo: fila['codigo'],
      categoria: fila['categoria'],
      subcategoria: fila['subcategoria'],
      nombre: fila['nombre del producto'],
      marca: fila['marca'],
      unidad: fila['unidad'],
      precioCompra: fila['p. compra (clp)'],
      precioVenta: fila['p. venta (clp)'],
      stock: fila['stock'],
      stockMinimo: fila['stock minimo'],
    }
  })
}