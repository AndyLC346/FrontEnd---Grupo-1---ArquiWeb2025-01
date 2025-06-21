import { Component, OnInit } from '@angular/core';
import { Tienda } from '../../../models/tienda';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import { TiendaService } from '../../../services/tienda.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listartienda',
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './listartienda.component.html',
  styleUrl: './listartienda.component.css'
})
export class ListartiendaComponent implements OnInit{
  dataSource:MatTableDataSource<Tienda>=new MatTableDataSource()

  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','cmapa','c7','c8']

  constructor(private tS:TiendaService){}
  ngOnInit(): void {
    this.tS.list().subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
    })
    this.tS.getList().subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
    })
  }

  eliminar(id:number){
    this.tS.deleteA(id).subscribe((data)=>{
      this.tS.list().subscribe((data)=>{
        this.tS.setList(data);
      })
    })
  }
}
