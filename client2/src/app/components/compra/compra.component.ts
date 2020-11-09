import { Component, OnInit } from '@angular/core';
import {ComprasService} from '../../services/compras.service'

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  constructor(private comprasService:ComprasService) { }
  compra =  JSON.parse(localStorage.getItem("compra"))
  idCompra = this.compra[0].idCompra
  productos:any=[]
  total
  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerTotal();
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

}
