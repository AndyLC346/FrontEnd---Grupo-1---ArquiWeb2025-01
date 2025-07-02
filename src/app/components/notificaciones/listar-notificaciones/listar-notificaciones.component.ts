import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Notificaciones } from '../../../models/notificaciones';
import { NotificacionesService } from '../../../services/notificaciones.service';

@Component({
  selector: 'app-listar-notificaciones',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './listar-notificaciones.component.html',
  styleUrl: './listar-notificaciones.component.css',
})
export class ListarNotificacionesComponent implements OnInit {
  dataSource: MatTableDataSource<Notificaciones> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private nS: NotificacionesService) {}

  ngOnInit(): void {
    this.nS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
      
    });
    this.nS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.nS.delete(id).subscribe(() => {
      this.nS.list().subscribe((data) => {
        this.nS.setList(data);
      });
    });
  }
}
