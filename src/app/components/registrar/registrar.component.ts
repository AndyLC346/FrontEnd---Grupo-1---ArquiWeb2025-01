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

@Component({
  selector: 'app-registrar',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, RouterLink, RouterModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  mensaje: string = '';

  ngOnInit(): void {}

  registrar() {
    if (this.password !== this.confirmPassword) {
      this.mensaje = 'Las contraseñas no coinciden';
      this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      return;
    }

    const request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;

    this.loginService.registrar(request).subscribe(
      (data: any) => {
        this.snackBar.open('Registro exitoso', 'Aviso', { duration: 2000 });
        this.router.navigate(['/login']);
      },
      (error) => {
        this.mensaje = 'Error al registrar usuario';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }

  volverLogin() {
    this.router.navigate(['/login']);
  }
}
