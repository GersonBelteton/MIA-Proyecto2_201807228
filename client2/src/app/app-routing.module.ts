import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component'
import {PerfilUsuarioComponent} from './components/perfil-usuario/perfil-usuario.component'
import {UpdateUsuarioComponent} from './components/update-usuario/update-usuario.component'
import {ListaProductosComponent} from './components/lista-productos/lista-productos.component'
import {DetalleProductoComponent} from './components/detalle-producto/detalle-producto.component'
import { from } from 'rxjs';
const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'user',
    component:PerfilUsuarioComponent

  },
  {
    path:'user/update',
    component:UpdateUsuarioComponent
  },
  {
    path:'user/products',
    component:ListaProductosComponent
  },
  {
    path:'user/products/detalle',
    component:DetalleProductoComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
