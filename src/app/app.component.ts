import { Component } from '@angular/core';
import { TiendaComponent } from "./components/tienda/tienda.component";
import { UsuarioComponent } from "./components/usuario/usuario.component";

@Component({
  selector: 'app-root',
  imports: [TiendaComponent, UsuarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontendGrupo1';
}

