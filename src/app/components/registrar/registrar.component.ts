  import { Component } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { MatButtonModule } from '@angular/material/button';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { RouterLink, RouterModule } from '@angular/router';
  import { LoginService } from '../../services/login.service';
  import { Router } from '@angular/router';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { JwtRequest } from '../../models/jwtRequest';
  import {MatSlideToggleModule} from '@angular/material/slide-toggle';

  @Component({
    selector: 'app-registrar',
    imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, RouterLink, RouterModule, MatSlideToggleModule ],
    templateUrl: './registrar.component.html',
    styleUrl: './registrar.component.css'
  })
  export class RegistrarComponent {

    username: string = '';
    password: string = '';
    confirmPassword: string = '';
    mensaje: string = '';
    nombres: string = '';
    apellidos: string = '';
    emailUsuario: string = '';
    telefono: string = '';
    enabled: boolean= false;
    constructor(
      private loginService: LoginService,
      private router: Router,
      private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {}

    registrar() {

    if (!this.telefono) {
      this.mostrarError('El teléfono es obligatorio');
      return;
    }

    // Validación de formato de teléfono (opcional)
    const phoneRegex = /^[0-9]{9,15}$/;
    if (!phoneRegex.test(this.telefono)) {
      this.mostrarError('Ingrese un teléfono válido (9-15 dígitos)');
      return;
    }
      // Validación de contraseñas
      if (this.password !== this.confirmPassword) {
        this.mostrarError('Las contraseñas no coinciden');
        return;
      }

      // Validación de email básica
      if (!this.emailUsuario || !this.emailUsuario.includes('@')) {
        this.mostrarError('Ingrese un email válido');
        return;
      }

      // Creación del objeto con todos los campos
      const request: any = {
        username: this.username,
        password: this.password,
        nombres: this.nombres,
        apellidos: this.apellidos,
        emailUsuario: this.emailUsuario,
        telefono: this.telefono,
        enabled: this.enabled
      };

      this.loginService.registrar(request).subscribe(
        (data: any) => {
          this.snackBar.open('Registro exitoso', 'Aviso', { duration: 2000 });
          this.router.navigate(['/login']);
        },
        (error) => {
          this.mostrarError(error.error?.message || 'Error al registrar usuario');
        }
      );
    }

    volverLogin() {
      this.router.navigate(['/login']);
    }

    private mostrarError(mensaje: string): void {
      this.mensaje = mensaje;
      this.snackBar.open(this.mensaje, 'Aviso', { 
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
