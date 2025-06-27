import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Resena } from '../../../models/resena';
import { ResenaService } from '../../../services/resena.service';

@Component({
  selector: 'app-listaresena',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './listaresena.component.html',
  styleUrl: './listaresena.component.css'
})
export class ListaresenaComponent implements OnInit{

  dataSource: MatTableDataSource<Resena> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7', 'c8']

  constructor(private rS: ResenaService) { }

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })

    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  eliminar(id:number){
    this.pS.deleteA(id).subscribe((data)=>{
      this.pS.list().subscribe((data)=>{
        this.pS.setList(data);
      })
    })
  }
}
