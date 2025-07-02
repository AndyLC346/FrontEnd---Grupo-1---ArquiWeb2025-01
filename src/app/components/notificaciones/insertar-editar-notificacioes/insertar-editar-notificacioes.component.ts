import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Notificaciones } from '../../../models/notificaciones';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-insertar-editar-notificaciones',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './insertar-editar-notificacioes.component.html',
  styleUrl: './insertar-editar-notificacioes.component.css',
})
export class InsertarEditarNotificacionesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  notificacion: Notificaciones = new Notificaciones();
  edicion: boolean = false;
  id: number = 0;
  listaUsuarios: Usuario[] = [];

  constructor(
    private nS: NotificacionesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];   
      
      this.edicion = this.id != null;
      this.init();
    });


    this.form = this.formBuilder.group({
      id: [''],
      mensaje: ['', Validators.required],
      fechaEnvio: ['', Validators.required],
      leido: [''],
      usuario1: ['', Validators.required],
    });

    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      console.log(this.form.value);
      
      this.notificacion.idNotificacion = this.form.value.id;
      this.notificacion.mensaje = this.form.value.mensaje;
      this.notificacion.fechaEnvioNotificacion = this.form.value.fechaEnvio;
      this.notificacion.leido = this.form.value.leido;
      this.notificacion.user.idUser = this.form.value.usuario1;

      if (this.edicion) {
        this.nS.update(this.notificacion).subscribe(() => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
      } else {
        this.nS.insert(this.notificacion).subscribe(() => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
      }
      this.router.navigate(['/notificaciones']);
    }
  }

  init() {
    if (this.edicion) {
      this.nS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          id: data.idNotificacion,
          mensaje: data.mensaje,
          fechaEnvio: data.fechaEnvioNotificacion,
          leido: data.leido,
          usuario1: data.user.idUser,
        });
      });
    }
  }
}
