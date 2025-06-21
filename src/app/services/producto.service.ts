import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = `${base_url}/productos`
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Producto[]>(this.url);
  }
  
}
