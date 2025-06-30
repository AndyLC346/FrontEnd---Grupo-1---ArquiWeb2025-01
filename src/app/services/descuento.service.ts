import { Injectable } from '@angular/core';
import { Descuentos } from '../models/descuento';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class DescuentoService {
  private url = `${base_url}/descuentos`;
  private listaDescuento = new Subject<Descuentos[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Descuentos[]>(`${this.url}`);
  }

  insert(D: Descuentos) {
    return this.http.post(`${this.url}`, D);
  }
   getList() {
    return this.listaDescuento.asObservable();
  }
  setList(listaNueva: Descuentos[]) {
    this.listaDescuento.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<Descuentos>(`${this.url}/${id}`);
  }
  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
   update(d: Descuentos) {
    return this.http.put(this.url, d);
  }
}
