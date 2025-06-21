import { Tienda } from "../models/tienda"

export class Producto{

  idProducto?: number
  nombreProducto: string=''
  descripcionProducto: string=''
  precioProducto: number=0
  categoriaProducto: string=''
  stock: number=0
  fechaCreacionProducto: Date = new Date()
  tienda: Tienda = new Tienda()
}