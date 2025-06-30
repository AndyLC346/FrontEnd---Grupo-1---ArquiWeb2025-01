import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Resena } from '../../../models/resena';
import { ResenaService } from '../../../services/resena.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-listaresena',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,MatPaginatorModule
  ],
  templateUrl: './listaresena.component.html',
  styleUrl: './listaresena.component.css'
})
export class ListaresenaComponent implements OnInit{

  dataSource: MatTableDataSource<Resena> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7']
 @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: ResenaService) { }

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })

    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }
    ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  eliminar(id:number){
    this.rS.deleteA(id).subscribe((data)=>{
      this.rS.list().subscribe((data)=>{
        this.rS.setList(data);
      })
    })
  }
}
