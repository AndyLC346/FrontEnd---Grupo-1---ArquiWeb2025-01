import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarproducto',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './listarproducto.component.html',
  styleUrl: './listarproducto.component.css'
})
export class ListarproductoComponent implements OnInit{
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource();

  displayedColumns: string[] = ['c1','c2','c3','c4','c5','c6','c7','c8',]

  constructor(private pS:ProductoService){}

  ngOnInit(): void {
      this.pS.list().subscribe((data) =>{
        this.dataSource = new MatTableDataSource(data);
      })
  }

}
