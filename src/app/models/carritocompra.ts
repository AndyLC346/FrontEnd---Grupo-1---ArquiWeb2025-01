import { Producto } from "./producto"
import { Usuario } from "./usuario"

export class CarritoCompra{
idCarritoCompra:number=0
fechaCreaCarritoCompra:Date =new Date()
producto:Producto=new Producto()
usuario:Usuario=new Usuario()
cantidad:number = 0
}
