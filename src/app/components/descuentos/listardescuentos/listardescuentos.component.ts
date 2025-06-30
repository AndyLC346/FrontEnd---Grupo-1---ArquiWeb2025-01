import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Descuentos } from '../../../models/descuento';
import { DescuentoService } from '../../../services/descuento.service';
import { RouterLink } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


@Component({
  selector: 'app-listardescuentos',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule,RouterLink,MatPaginatorModule],
  templateUrl: './listardescuentos.component.html',
  styleUrl: './listardescuentos.component.css'
})
export class ListardescuentosComponent {
    dataSource: MatTableDataSource<Descuentos> = new MatTableDataSource();
displayedColumns: string[] = ['c1','c2','c3','c4','c5','c6','c7','c8']
 @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dS:DescuentoService){}
  ngOnInit(): void {
      this.dS.list().subscribe((data) =>{
        this.dataSource = new MatTableDataSource(data);
      })
  }
      ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
    eliminar(id:number){
    this.dS.deleteA(id).subscribe((data)=>{
      this.dS.list().subscribe((data)=>{
        this.dS.setList(data);
      })
    })
  }
}
