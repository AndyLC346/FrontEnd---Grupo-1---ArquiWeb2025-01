import { Component, OnInit, ViewChild } from '@angular/core';
import { Tienda } from '../../../models/tienda';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { TiendaService } from '../../../services/tienda.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { VermapaComponent } from '../vermapa/vermapa.component';

@Component({
  selector: 'app-listartienda',
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    MatIconModule

  ],
  templateUrl: './listartienda.component.html',
  styleUrl: './listartienda.component.css'
})
export class ListartiendaComponent implements OnInit {
  dataSource: MatTableDataSource<Tienda> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tS: TiendaService,
    private dialog: MatDialog
  ) { }

  mostrarMapa(tienda: Tienda) {
    this.dialog.open(VermapaComponent, {
      width: '400px',
      data: {
        lat: tienda.latitudTienda,
        lon: tienda.longitudTienda
      }
    })
  }


  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.tS.deleteA(id).subscribe((data) => {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
      })
    })
  }
}
