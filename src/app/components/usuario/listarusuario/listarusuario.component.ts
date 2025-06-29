import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';



@Component({
  selector: 'app-listarusuario',
  imports: [
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource()

  displayedColumns: string[] = ["c1", "c2", "c3"]

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS: UsuarioService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })

  }
}
