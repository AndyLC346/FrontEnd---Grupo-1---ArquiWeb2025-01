import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Chats } from '../../../models/chat';
import { ChatService } from '../../../services/chat.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listarchat',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule,FormsModule,
    RouterLink,
    MatIconModule,
    MatPaginator,MatInputModule,
    MatPaginatorModule,MatFormFieldModule],
  templateUrl: './listarchat.component.html',
  styleUrl: './listarchat.component.css'
})
export class ListarchatComponent implements OnInit {
  dataSource: MatTableDataSource<Chats> = new MatTableDataSource();

  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',

  ];
    filtro: string = '';


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: ChatService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.cS.deleteA(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }

    aplicarFiltro() {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }
}