import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DescuentoService } from '../../../services/descuento.service';
import { Descuentos } from '../../../models/descuento';

@Component({
  selector: 'app-listardescuentos',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule
  ],
  templateUrl: './listardescuentos.component.html',
  styleUrls: ['./listardescuentos.component.css']
})
export class ListardescuentosComponent implements OnInit {
  dataSource: MatTableDataSource<Descuentos> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dS: DescuentoService) {}

  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.dS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number): void {
    this.dS.deleteA(id).subscribe(() => {
      this.dS.list().subscribe((data) => {
        this.dS.setList(data);
      });
    });
  }
}
