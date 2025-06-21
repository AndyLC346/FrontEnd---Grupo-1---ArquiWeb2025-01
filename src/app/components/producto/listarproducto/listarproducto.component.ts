import { Component } from '@angular/core';
import { Producto } from '../../../models/producto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductoService } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarproducto',
  imports: [MatTableModule, CommonModule],
  templateUrl: './listarproducto.component.html',
  styleUrl: './listarproducto.component.css'
})
export class ListarproductoComponent {
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource()

  displayedColumns: string[] = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8",]

  constructor(private pS: ProductoService) { }

  ngOnInit(): void {
    this.pS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })

  }
}
