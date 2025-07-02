import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { CarritocompraService } from '../../../services/carritocompra.service';
import { ProductoService } from '../../../services/producto.service';
import { UsuarioService } from '../../../services/usuario.service';

import { CarritoCompra } from '../../../models/carritocompra';
import { Producto } from '../../../models/producto';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-insertareditarcarritocompra',
  templateUrl: './insertareditarcarritocompra.component.html',
  styleUrls: ['./insertareditarcarritocompra.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink
  ],
})
export class InsertareditarcarritocompraComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  carritocompra: CarritoCompra = new CarritoCompra();

  listaUsuarios: Usuario[] = [];
  listaProductos: Producto[] = [];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private ccS: CarritocompraService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      idUsuario: ['', Validators.required],
      idProducto: ['', Validators.required],
      fecha: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
    });

    this.usuarioService.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.productoService.list().subscribe((data) => {
      this.listaProductos = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.carritocompra.idCarritoCompra = this.form.value.codigo;
      this.carritocompra.fechaCreaCarritoCompra = this.form.value.fecha;
      this.carritocompra.cantidad = this.form.value.cantidad;

      this.carritocompra.user = new Usuario();
      this.carritocompra.user.idUser = this.form.value.idUsuario;

      this.carritocompra.producto = new Producto();
      this.carritocompra.producto.idProducto = this.form.value.idProducto;

      if (this.edicion) {
        this.ccS.update(this.carritocompra).subscribe(() => {
          this.ccS.list().subscribe((data) => this.ccS.setList(data));
        });
      } else {
        this.ccS.insert(this.carritocompra).subscribe(() => {
          this.ccS.list().subscribe((data) => this.ccS.setList(data));
        });
      }

      this.router.navigate(['carritocompra']);
    }
  }

  cancelar() {
    this.router.navigate(['carritocompra']);
  }

  initForm() {
    if (this.edicion) {
      this.ccS.listID(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: new FormControl(data.idCarritoCompra),
          idUsuario: new FormControl(data.user.idUser),
          idProducto: new FormControl(data.producto.idProducto),
          fecha: new FormControl(data.fechaCreaCarritoCompra),
          cantidad: new FormControl(data.cantidad),
        });
      });
    }
  }
}
