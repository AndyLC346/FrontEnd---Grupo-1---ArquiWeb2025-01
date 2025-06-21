import { Routes } from '@angular/router';
import { TiendaComponent } from './components/tienda/tienda.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertareditartiendaComponent } from './components/tienda/insertareditartienda/insertareditartienda.component';
import { HomeComponent } from './components/home/home.component';
import { ProductoComponent } from './components/producto/producto.component';

export const routes: Routes = [
  {
    path:'', component:HomeComponent, pathMatch:'full'
  },
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
  },

  {
    path:'productos',component:ProductoComponent,
  }

];
