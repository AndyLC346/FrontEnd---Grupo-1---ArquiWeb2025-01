export class OrdenCarritoCompraDTO {
  idCarritoCompra: number = 0; // de la entidad CarritoCompra
  fechaCreaCarritoCompra: Date = new Date(); // de CarritoCompra

  username: string = ''; // de Usuario
  nombreProducto: string = ''; // de Producto
  precioProducto: number = 0; // de Producto

  cantidad: number = 0; // de CarritoCompra
}
