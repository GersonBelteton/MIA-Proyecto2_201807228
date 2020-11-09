import { Component, OnInit } from '@angular/core';
import {Comentario}from '../../models/comentario'
import {ProductosService}from '../../services/productos.service'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private productosService:ProductosService) { }


  producto =  JSON.parse(localStorage.getItem("prod"))
  usuario =  JSON.parse(localStorage.getItem("sesion"))
  chat =  JSON.parse(localStorage.getItem("chat"))
  idUsuario = this.usuario[0].id
  idProducto =this.producto[0].id
  nombre = this.producto[0].nombre
  detalle = this.producto[0].detalle
  precio = this.producto[0].precio
  nombreU = this.producto[0].nombreU
  apellido = this.producto[0].apellido
  idUsuarioP = this.producto[0].idUsuario


  idEmisorl = this.chat.idEmisor
  idReceptorl = this.chat.idReceptor
  comentarios:any = []

  coment: Comentario={
    idUsuario: this.idEmisorl,
    idProducto:this.idProducto,
    descripcion:'',
    tipo:'h',
    idUsuariod:this.idReceptorl
  }
  ngOnInit(): void {
    this.obtenerComentarios();
  }


  obtenerComentarios(){
    this.productosService.getChat(this.idEmisorl,this.idReceptorl).subscribe(
      res =>{
        console.log(res)
        this.comentarios = res
      
      },
      err=>console.log(err)
    )
  }
  comentar(){
    this.productosService.saveChat(this.coment).subscribe(
      res =>{
        console.log(res)
        location.href='/user/products/detalle/chat'
      },
      err=>console.log(err)
    )
  }
}
