import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { UpdateUsuarioComponent } from './components/update-usuario/update-usuario.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { ChatComponent } from './components/chat/chat.component';
import { ListaChatComponent } from './components/lista-chat/lista-chat.component';
import { CompraComponent } from './components/compra/compra.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { ReportesComponent } from './components/reportes/reportes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilUsuarioComponent,
    UpdateUsuarioComponent,
    ListaProductosComponent,
    AgregarProductoComponent,
    DetalleProductoComponent,
    ChatComponent,
    ListaChatComponent,
    CompraComponent,
    AdministradorComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
