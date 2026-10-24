export const DESCUENTO_OFERTA = 0.15

export const formatoCLP = (valor) => '$' + valor.toLocaleString('es-CL')

export const esOferta = (p) => p.stock >= p.stockMinimo * 4

export const precioFinal = (p) =>
  esOferta(p) ? Math.round(p.precioVenta * (1 - DESCUENTO_OFERTA)) : p.precioVenta