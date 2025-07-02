import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Resena } from '../../../models/resena';
import { Usuario } from '../../../models/usuario';
import { Producto } from '../../../models/producto';
import { ResenaService } from '../../../services/resena.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-insertareditaresena',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,RouterLink,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './insertareditaresena.component.html',
  styleUrl: './insertareditaresena.component.css'
})
export class InsertareditaresenaComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  resena: Resena = new Resena();
  id: number = 0
  actualizacion: boolean = false

  listaUsuario: Usuario[]=[]
  listaProducto: Producto[]=[]

  tipos:{value:string,viewValue:string}[]=[
    {value:'1',viewValue:'1'},
    {value:'2',viewValue:'2'},
    {value:'3',viewValue:'3'},
    {value:'4',viewValue:'4'},
    {value:'5',viewValue:'5'},

  ]

  constructor(
    private rS: ResenaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private pS: ProductoService

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.actualizacion = data['id'] != null;
      this.init();
      // Actualizar
    })

    this.form = this.formBuilder.group({
      codigorese: [''],
      califresena: ['', Validators.required],
      comentarioresena: ['', Validators.required],
      fecharesena: ['', Validators.required],
      usersito: ['', Validators.required],
      productito: ['', Validators.required]
    })

    this.uS.list().subscribe(data=>{
      this.listaUsuario=data
    })

    this.pS.list().subscribe(data=>{
      this.listaProducto=data
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.resena.idResena = this.form.value.codigorese
      this.resena.calificacion = this.form.value.califresena
      this.resena.comentario = this.form.value.comentarioresena
      this.resena.fecha = this.form.value.fecharesena
      this.resena.user.idUser = this.form.value.usersito
      this.resena.producto.idProducto = this.form.value.productito


      if (this.actualizacion) {
        //actualizar
        this.rS.update(this.resena).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data)
          })
        })
      } else {
        //Insertar
        this.rS.insert(this.resena).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['resenas']);
    }
  }


  init() {
    if (this.actualizacion) {
      this.rS.listID(this.id).subscribe((data) => {

        this.form = new FormGroup({
          codigorese: new FormControl(data.idResena),
          califresena: new FormControl(data.calificacion),
          comentarioresena: new FormControl(data.comentario),
          fecharesena: new FormControl(data.fecha),
          usersito: new FormControl(data.user.idUser),
          productito: new FormControl(data.producto.idProducto),
        })
      })
    }
  }

  cancelar() {
    this.router.navigate(['resenas'])
  }
}
