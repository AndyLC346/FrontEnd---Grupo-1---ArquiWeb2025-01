import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tienda } from '../../../models/tienda';
import { TiendaService } from '../../../services/tienda.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-insertareditartienda',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule],
  templateUrl: './insertareditartienda.component.html',
  styleUrl: './insertareditartienda.component.css'
})
export class InsertareditartiendaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tienda: Tienda = new Tienda();
  id: number = 0
  actualizacion: boolean = false

  constructor(
    private tS: TiendaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.actualizacion = data['id'] != null;
      this.init();
      // Actualizar
    })

    this.form = this.formBuilder.group({
      codigo: [''],
      cajita: ['', Validators.required],
      ubicaciontienda: ['', Validators.required],
      descripciontienda: ['', Validators.required],
      telefonotienda: ['', Validators.required],
      correotienda: ['', Validators.required],
      latitudtienda: ['', Validators.required],
      longitudtienda: ['', Validators.required]
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.tienda.idTienda = this.form.value.codigo
      this.tienda.ubicacion = this.form.value.ubicaciontienda
      this.tienda.nombreTienda = this.form.value.cajita
      this.tienda.descripcionTienda = this.form.value.descripciontienda
      this.tienda.telefonoTienda = this.form.value.telefonotienda
      this.tienda.correoElectronico = this.form.value.correotienda
      this.tienda.latitudTienda = this.form.value.latitudtienda
      this.tienda.longitudTienda = this.form.value.longitudtienda

      
      if (this.actualizacion) {
        //actualizar
        this.tS.update(this.tienda).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data)
          })
        })
      } else {
        //Insertar
        this.tS.insert(this.tienda).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      }
      this.router.navigate(['tiendas']);
    }
  }


  init() {
    if (this.actualizacion) {
      this.tS.listID(this.id).subscribe((data) => {

        this.form = new FormGroup({
          codigo: new FormControl(data.idTienda),
          cajita: new FormControl(data.nombreTienda),
          ubicaciontienda: new FormControl(data.ubicacion),
          descripciontienda: new FormControl(data.descripcionTienda),
          telefonotienda: new FormControl(data.telefonoTienda),
          correotienda: new FormControl(data.correoElectronico),
          latitudtienda: new FormControl(data.latitudTienda),
          longitudtienda: new FormControl(data.latitudTienda),
        })
      })
    }
  }
}
