import { Component, OnInit } from '@angular/core';
import {ComprasService} from '../../services/compras.service'

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  constructor(private comprasService:ComprasService) { }
  usuario =  JSON.parse(localStorage.getItem("sesion"))
  idUsuario = this.usuario[0].id

  compra =  JSON.parse(localStorage.getItem("compra"))
  idCompra = this.compra[0].idCompra
  productos:any=[]
  total
  creditos
  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerTotal();
    this.obtenerCredito();
  }

  obtenerCredito(){
    this.comprasService.getCredito(this.idUsuario).subscribe(
      res => {
        console.log(res)
        this.creditos = res[0]
      },
      err => console.log(err)
    )
  }
  obtenerProductos(){
    this.comprasService.getProductos(this.idCompra).subscribe(
      res => {
      
        console.log(res)
        this.productos = res
      },
      err => console.log(err)
    )
  }

  obtenerTotal(){
    this.comprasService.getTotal(this.idCompra).subscribe(
      res=>{
        console.log(res)
        this.total =res[0]
      },
      err=>console.log(err)
    )
  }

  limpiarCarro(){
    this.comprasService.limpiarCarro(this.idCompra).subscribe(
      res =>{
        console.log(res)
        this.sumarTotal()
      },
      err=>console.log(err)
    )

    
  }

  sumarTotal(){
    this.comprasService.setTotal(this.idCompra).subscribe(
      res => {
      
        console.log(res)
        location.href='/user/compra'
      },
      err => console.log(err)
    )
  }



  comprar(){
    for(let prod of this.productos){
      this.sumarCredito(prod.precio, prod.idUsuario);
    }
    this.restarCredito();
  }

  restarCredito(){
    this.comprasService.restarCredito(this.total.total,this.idUsuario ).subscribe(
      res => {
        console.log(res)
        this.borrarProductos()
      },
      err => console.log(err)
    )
  }
  sumarCredito(precio, idUsuario){
    this.comprasService.sumarCredito(precio,idUsuario).subscribe(
      res => {
        console.log(res)

      },
      err => console.log(err)
    )
  }

  borrarProductos(){
    this.comprasService.borrarProductos(this.idCompra).subscribe(
      res => {
        console.log(res)
        location.href= '/user/compra'
      },
      err => console.log(err)
    )
  }

}
