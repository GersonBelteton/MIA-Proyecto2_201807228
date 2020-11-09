import { Component, OnInit } from '@angular/core';
import {ProductosService}from '../../services/productos.service'
import {Like} from '../../models/like'
import {Dislike} from '../../models/dislike'
import {Comentario}from '../../models/comentario'
import {Chat}from '../../models/Chat'
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  constructor(private productosService:ProductosService) { }

  producto =  JSON.parse(localStorage.getItem("prod"))
  usuario =  JSON.parse(localStorage.getItem("sesion"))
  idUsuario = this.usuario[0].id
  idProducto =this.producto[0].id
  nombre = this.producto[0].nombre
  detalle = this.producto[0].detalle
  precio = this.producto[0].precio
  nombreU = this.producto[0].nombreU
  apellido = this.producto[0].apellido
  idUsuariod = this.producto[0].idUsuario
  likes:any = []
  dislikes:any = []

  comentarios:any = []

  coment: Comentario={
    idUsuario: this.idUsuario,
    idProducto:this.idProducto,
    descripcion:'',
    tipo:'C'
  }

  chat: Chat={
    idEmisor:this.idUsuario,
    idReceptor:this.idUsuariod
  }
  like: Like={
    idUsuario: this.idUsuario,
    idProducto:this.idProducto

  };

  dislike: Dislike={
    idUsuario: this.idUsuario,
    idProducto:this.idProducto

  };
  ngOnInit(): void {
    this.obtenerLikes(this.idProducto);
    this.obtenerDislikes(this.idProducto);
    this.obtenerComentarios(this.idProducto);
  }

  comentar(){
    this.productosService.saveComentario(this.coment).subscribe(
      res =>{
        console.log(res)
        location.href='/user/products/detalle'
      },
      err=>console.log(err)
    )
  }
  obtenerComentarios(id){
    this.productosService.getComentarios(id).subscribe(
      res =>{
        console.log(res)
        this.comentarios = res
      
      },
      err=>console.log(err)
    )
  }

  obtenerLikes(id){
    this.productosService.getLikes(id).subscribe(
      res =>{
        console.log(res)
        this.likes = res
      
      },
      err=>console.log(err)


    )
  }

  obtenerDislikes(id){
    this.productosService.getDislikes(id).subscribe(
      res =>{
        console.log(res)
        this.dislikes = res
      
      },
      err=>console.log(err)


    )
  }

  pushLike(){
    this.productosService.existeLike(this.idUsuario,this.idProducto).subscribe(
      res =>{
        console.log(res)
        if(res != '0'){
          console.log('quitar like')
          this.restarLike();
        }else{
          console.log('poner like')
          this.sumarLike();
          this.exDisLike();
        }
      },
      err=>console.log(err)
    )


  }
  restarLike(){
    this.productosService.quitarlike(this.idUsuario, this.idProducto).subscribe(
      res =>{
        console.log(res)
        location.href='/user/products/detalle'
      },
      err=>console.log(err)
    )
  }
  sumarLike(){
    this.productosService.addLike(this.like).subscribe(
      res =>{
        console.log(res)
        location.href='/user/products/detalle'
      },
      err=>console.log(err)
    )
    //sdfsdkjhjkhjkhjkhjkhjk
  }
  exLike(){
    this.productosService.existeLike(this.idUsuario,this.idProducto).subscribe(
      res =>{
        console.log(res)
        if(res != '0'){
          console.log('quitar like')
          this.restarLike();
        }else{

        }
      },
      err=>console.log(err)
    )   
  }
  exDisLike(){
    this.productosService.existeDislike(this.idUsuario,this.idProducto).subscribe(
      res =>{
        console.log(res)
        if(res != '0'){
          console.log('quitar dislike')
          this.restarDislike();
        }else{

        }
      },
      err=>console.log(err)
    )   
  }
  pushDislike(){
    this.productosService.existeDislike(this.idUsuario,this.idProducto).subscribe(
      res =>{
        console.log(res)
        if(res != '0'){
          console.log('quitar dislike')
          this.restarDislike();
        }else{
          console.log('poner dislike')
          this.sumarDislike();
          this.exLike();
        }
      },
      err=>console.log(err)
    )    
  }


  restarDislike(){
    this.productosService.quitardislike(this.idUsuario, this.idProducto).subscribe(
      res =>{
        console.log(res)
        location.href='/user/products/detalle'
      },
      err=>console.log(err)
    )
  }
  sumarDislike(){
    this.productosService.addDislike(this.dislike).subscribe(
      res =>{
        console.log(res)
        location.href='/user/products/detalle'
      },
      err=>console.log(err)
    )
  }

  existeChat(){
    this.productosService.existeChat(this.idUsuario,this.idUsuariod).subscribe(
      res =>{
        console.log(res)
        if(res != '0'){
          localStorage.setItem("chat",JSON.stringify(this.chat))

          location.href='/user/products/detalle/chat'
        }else{
          this.iniciarchat()
        }
      },
      err=>console.log(err)
    )   

  }
  iniciarchat(){
    this.productosService.addChat(this.chat).subscribe(
      res =>{
        console.log(res)
        //location.href='/user/products/detalle'

        localStorage.setItem("chat",JSON.stringify(this.chat))

        location.href='/user/products/detalle/chat'
      },
      err=>console.log(err)
    )
   
  }
}
