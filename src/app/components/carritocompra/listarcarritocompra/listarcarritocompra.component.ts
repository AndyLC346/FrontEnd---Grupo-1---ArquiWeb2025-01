import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CarritoCompra } from '../../../models/carritocompra';
import { CarritocompraService } from '../../../services/carritocompra.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-listarcarritocompra',
  imports: [  MatTableModule,
    MatButtonModule,
  MatIconModule,CommonModule,MatPaginatorModule],
  templateUrl: './listarcarritocompra.component.html',
  styleUrl: './listarcarritocompra.component.css'
})
export class ListarcarritocompraComponent implements OnInit {
dataSource:MatTableDataSource<CarritoCompra>=new MatTableDataSource()

displayedColumns:string[]=['c1','c2','c3','c4','c5','c6']

 @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private Cs:CarritocompraService){}
  ngOnInit(): void {
    this.Cs.list().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data);
    })
    this.Cs.getList().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data);
    })
  }
      ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
    eliminar(id:number){
    this.Cs.deleteA(id).subscribe((data)=>{
      this.Cs.list().subscribe((data)=>{
        this.Cs.setList(data);
      })
    })
  }
    aumentarCantidad(element: CarritoCompra) {
    element.cantidad += 1;
    this.Cs.update(element).subscribe(() => {
      this.Cs.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
    });
  }

  disminuirCantidad(element: CarritoCompra) {
    if (element.cantidad > 1) {
      element.cantidad -= 1;
      this.Cs.update(element).subscribe(() => {
        this.Cs.list().subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
        });
      });
    }
  }
}
