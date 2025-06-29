import { Component, OnInit } from '@angular/core';
import { CarritoCompra } from '../../../models/carritocompra';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarritocompraService } from '../../../services/carritocompra.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-insertareditarcarritocompra',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatRadioModule,
  MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,MatNativeDateModule],
  templateUrl: './insertareditarcarritocompra.component.html',
  styleUrl: './insertareditarcarritocompra.component.css'
})
export class InsertareditarcarritocompraComponent implements OnInit {
    form: FormGroup = new FormGroup({});
  carritocompra: CarritoCompra = new CarritoCompra();
  estado: boolean = true;

    id: number = 0;
  edicion: boolean = false;
  //falta metodopago
constructor(
    private Cs: CarritocompraService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
ngOnInit(): void {


    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      fecha: ['', Validators.required],
      product: ['', Validators.required],
      cantidad:['', Validators.required]
    
    });
  }
 aceptar() {
    if (this.form.valid) {
      
      this.carritocompra.usuario.username = this.form.value.user;
      this.carritocompra.fechaCreaCarritoCompra = this.form.value.fecha;
      this.carritocompra.producto.nombreProducto = this.form.value.product;
this.carritocompra.cantidad=this.form.value.cantidad

      this.Cs.insert(this.carritocompra).subscribe(() => {
        this.Cs.list().subscribe((data) => {
          this.Cs.setList(data);
        });
      });

      this.router.navigate(['carritocompra']);
    }
  }
  aumentarCantidad() {
  let cantidadActual = this.form.get('cantidad')?.value || 0;
  this.form.get('cantidad')?.setValue(cantidadActual + 1);
}

disminuirCantidad() {
  let cantidadActual = this.form.get('cantidad')?.value || 1;
  if (cantidadActual > 1) {
    this.form.get('cantidad')?.setValue(cantidadActual - 1);
  }

}
}
