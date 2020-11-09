import { Component, OnInit } from '@angular/core';
import {ProductosService} from '../../services/productos.service'
import {Chat} from '../../models/Chat'
@Component({
  selector: 'app-lista-chat',
  templateUrl: './lista-chat.component.html',
  styleUrls: ['./lista-chat.component.css']
})
export class ListaChatComponent implements OnInit {

  constructor(private productosService:ProductosService) { }


  chat: Chat={
    idEmisor:0,
    idReceptor:0
  }
  usuario =  JSON.parse(localStorage.getItem("sesion"))
  idUsuario = this.usuario[0].id
  chats:any =[]
  ngOnInit(): void {
    this.obtenerChats();
  }


  obtenerChats(){
   
      this.productosService.getChatList(this.idUsuario).subscribe(
        res =>{
          console.log(res)
          this.chats = res
        
        },
        err=>console.log(err)
  
  
      )
    
  }


  verChat(idEmisor,idReceptor){
    console.log("emisor, receptor"+idEmisor+" "+idReceptor)
    this.chat.idEmisor = idEmisor
    this.chat.idReceptor = idReceptor

    localStorage.setItem("chat",JSON.stringify(this.chat))

    location.href='/user/products/detalle/chat'
  }

}
