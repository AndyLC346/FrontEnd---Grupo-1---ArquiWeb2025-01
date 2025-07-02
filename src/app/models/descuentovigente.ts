export class ListarDescuentoVigentesDTO {
  idDescuento: number = 0;
  codigoDescuento: string = '';
  porcentajeDescuento: number = 0;
  fechaInicioDescuento: Date = new Date();
  fechaFinDescuento: Date = new Date();
}
