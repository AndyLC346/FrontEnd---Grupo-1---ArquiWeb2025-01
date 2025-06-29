import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DescuentoService } from '../../../services/descuento.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Descuentos } from '../../../models/descuento';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-insertareditardescuentos',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,MatNativeDateModule
  ],
  templateUrl: './insertareditardescuentos.component.html',
  styleUrl: './insertareditardescuentos.component.css',
})
export class InsertareditardescuentosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  descuentos: Descuentos = new Descuentos();
  id: number = 0;
  desCuento: boolean = false;

  constructor(
    private dS: DescuentoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.desCuento = data['id'] != null;
      this.init();
      // Actualizar
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      porcentajedescuento: ['', Validators.required],
      codigodescuento: ['', Validators.required],
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      idproducto: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.descuentos.idDescuento = this.form.value.codigo;
      this.descuentos.porcentajeDescuento = this.form.value.porcentajedescuento;
      this.descuentos.codigoDescuento = this.form.value.codigodescuento;
      this.descuentos.fechaInicioDescuento = this.form.value.fechainicio;
      this.descuentos.fechaFinDescuento = this.form.value.fechafin;
      this.descuentos.producto.idProducto = this.form.value.idproducto;
        if (this.desCuento) {
        //actualizar
        this.dS.update(this.descuentos).subscribe(() => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      } 
      this.dS.insert(this.descuentos).subscribe(() => {
        this.dS.list().subscribe((data) => {
          this.dS.setList(data);
        });
      });

      this.router.navigate(['descuentos']);
    }
  }
  init() {
    if (this.desCuento) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idDescuento),
          porcentajedescuento: new FormControl(data.porcentajeDescuento),
          codigodescuento: new FormControl(data.codigoDescuento),
          fechainicio: new FormControl(data.fechaInicioDescuento),
          fechafin: new FormControl(data.fechaFinDescuento),
          idproducto: new FormControl(data.producto.idProducto),
        });
      });
    }
  }

}
