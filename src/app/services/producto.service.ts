import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url=`${base_url}/productos`

  constructor(private h:HttpClient) { }

  list(){
    return this.h.get<Producto[]>(`${this.url}/listadoproducto`);
  }
  
}
