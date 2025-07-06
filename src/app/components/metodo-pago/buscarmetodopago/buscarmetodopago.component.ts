import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MetodoPago } from '../../../models/metodo-pago';
import { MetodoPagoService } from '../../../services/metodo-pago.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-buscarmetodopago',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './buscarmetodopago.component.html',
  styleUrl: './buscarmetodopago.component.css'
})
export class BuscarmetodopagoComponent implements OnInit {

  dataSource: MatTableDataSource<MetodoPago> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];


  form: FormGroup;
  tipoBusqueda: string = '';

  constructor(
    private mpS: MetodoPagoService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.form = fb.group({
      cajita: [''],
    });
  }

  ngOnInit(): void {
    /* carga inicial */
    this.mpS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    /* escucha cambios en el input */
    this.form.get('cajita')?.valueChanges.subscribe((value) => {
      this.tipoBusqueda = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.tipoBusqueda.trim()) {
      this.mpS.searchByTipo(this.tipoBusqueda).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    } else {
      /* recarga lista completa */
      this.mpS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }
}
