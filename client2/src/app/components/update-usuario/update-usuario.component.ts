import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../models/usuario'
import {UsuariosService} from '../../services/usuarios.service'
@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.css']
})
export class UpdateUsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuariosService) { }
  usuariols =  JSON.parse(localStorage.getItem("sesion"))
  id = this.usuariols[0].id


  usuario: Usuario={
    idUsuario:this.id,
    correo:'',
    contrasena:'',
    nombre:'',
    apellido:'',
    fecha_nacimiento:'',
    pais:''
  };

  contra1
  contra2
  ngOnInit(): void {
  }

  validar(){
    if(this.contra1 == this.contra2){
      this.usuario.contrasena = this.contra1
      this.registrar()
    }else{
      console.log('contrasenas no coinciden')
    }
  }

  registrar(){
    console.log('registrar')
    console.log(this.usuario)
    this.usuarioService.updateUsuario(this.usuario).subscribe(
     res =>{
        console.log(res);
        localStorage.setItem("sesion",JSON.stringify(this.usuario)) 
     },
     err => console.error(err)
    );
  }

}
