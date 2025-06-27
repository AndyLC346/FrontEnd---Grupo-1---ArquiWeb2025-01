import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Tienda } from '../../../models/tienda';
import { TiendaService } from '../../../services/tienda.service';


@Component({
  selector: 'app-insertareditarproducto',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './insertareditarproducto.component.html',
  styleUrl: './insertareditarproducto.component.css'
})
export class InsertareditarproductoComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  producto: Producto = new Producto();
  id: number = 0
  actualizacion: boolean = false

  listaTienda: Tienda[]=[]

  tipos:{value:string,viewValue:string}[]=[
    {value:'Tecnologia',viewValue:'Tecnologia'},
    {value:'Hogar',viewValue:'Hogar'},
    {value:'Calzado',viewValue:'Calzado'},
    {value:'Ropa',viewValue:'Ropa'},
    {value:'Entretenimiento',viewValue:'Entretenimiento'},

  ]

  constructor(
    private pS: ProductoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tS: TiendaService

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.actualizacion = data['id'] != null;
      this.init();
      // Actualizar
    })

    this.form = this.formBuilder.group({
      codigopro: [''],
      nombrepro: ['', Validators.required],
      descripcionPro: ['', Validators.required],
      precioPro: ['', Validators.required],
      categoriaPro: ['', Validators.required],
      stockPro: ['', Validators.required],
      fechaPro: ['', Validators.required],
      tiendita: ['', Validators.required]
    })

    this.tS.list().subscribe(data=>{
      this.listaTienda=data
    })

  }

  aceptar() {
    if (this.form.valid) {
      this.producto.idProducto = this.form.value.codigopro
      this.producto.nombreProducto = this.form.value.nombrepro
      this.producto.descripcionProducto = this.form.value.descripcionPro
      this.producto.precioProducto = this.form.value.precioPro
      this.producto.categoriaProducto = this.form.value.categoriaPro
      this.producto.stock = this.form.value.stockPro
      this.producto.fechaCreacionProducto = this.form.value.fechaPro
      this.producto.tienda.idTienda = this.form.value.tiendita


      if (this.actualizacion) {
        //actualizar
        this.pS.update(this.producto).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data)
          })
        })
      } else {
        //Insertar
        this.pS.insert(this.producto).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }
      this.router.navigate(['productos']);
    }
  }


  init() {
    if (this.actualizacion) {
      this.pS.listID(this.id).subscribe((data) => {

        this.form = new FormGroup({
          codigopro: new FormControl(data.idProducto),
          nombrepro: new FormControl(data.nombreProducto),
          descripcionPro: new FormControl(data.descripcionProducto),
          precioPro: new FormControl(data.precioProducto),
          categoriaPro: new FormControl(data.categoriaProducto),
          stockPro: new FormControl(data.stock),
          fechaPro: new FormControl(data.fechaCreacionProducto),
          tiendita: new FormControl(data.tienda.idTienda),
        })
      })
    }
  }
}
