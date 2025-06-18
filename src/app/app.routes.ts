import { Routes } from '@angular/router';
import { TiendaComponent } from './components/tienda/tienda.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertareditartiendaComponent } from './components/tienda/insertareditartienda/insertareditartienda.component';

export const routes: Routes = [
  {
    path:'tiendas', component:TiendaComponent,
    children:[{
      path:'insertareditartienda',component:InsertareditartiendaComponent
    },

    {
      path:'actualizaciones/:id',component:InsertareditartiendaComponent
    }
  ]
  },

  {
    path:'usuarios',component:UsuarioComponent,
  }
];
