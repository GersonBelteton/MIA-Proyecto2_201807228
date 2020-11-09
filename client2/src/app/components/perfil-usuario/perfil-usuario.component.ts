import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service'
import {ComprasService} from '../../services/compras.service'
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(private comprasService: ComprasService,private usuarioService: UsuariosService) { }
  usuario =  JSON.parse(localStorage.getItem("sesion"))

  apellido = this.usuario[0].apellido;
  nombre = this.usuario[0].nombre;
  correo = this.usuario[0].correo;
  contrasena = this.usuario[0].contrasena;
  pais = this.usuario[0].pais;
  fecha = this.usuario[0].fecha_nacimiento;
  id = this.usuario[0].id
  foto = this.usuario[0].foto
  url = this.foto

  ngOnInit(): void {
   this.obtenerCompra()
  }

  
    readUrl(event:any) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.onload = (event:any) => {
          this.url = event.target.result;
          console.log(this.url)
          
        }
        reader.readAsDataURL(event.target.files[0]);
      }

      this.cambiarFoto()
  }


cambiarFoto(){
  console.log('cambiar foto')
  this.url = 'file:///home/gerson/Escritorio/practica1prueba/%5BMIA%5DModeloPropuesto.png'
/*  console.log('cambiar foto')
  this.usuarioService.guardarFoto(this.url,this.id).subscribe(
   res =>{
      console.log(res);
   
      //location.href = '/user'
   },
   err => console.error(err)
  );*/
}


modificar(){  
  location.href='/user/update'
}


obtenerCompra(){
  console.log(this.id)
  this.comprasService.getCompra(this.id).subscribe(
    res =>{
       console.log(res);
       localStorage.setItem("compra",JSON.stringify(res)) 
       //location.href = '/user'
    },
    err => console.error(err)
   );
}
}
