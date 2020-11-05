import { Component, OnInit, HostBinding } from '@angular/core';
import {ProductosService}from '../../services/productos.service'
import {Producto} from '../../models/producto'
@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  //@HostBinding('class') classes = 'row'
  constructor(private productosService:ProductosService) { }
  usuario =  JSON.parse(localStorage.getItem("sesion"))
  idUs = this.usuario[0].id
  productos:any=[]

  formProducto = false;

  producto: Producto={
    idProducto: 0,
    nombre_producto:'',
    detalle:'',
    precio:0,
    idUsuario:this.idUs,
  };

  ngOnInit(): void {

    this.getProductos()
  }

  getProductos(){
    this.productosService.getProductos().subscribe(
      res => {
        this.productos = res;

      },
      err => console.log(err)
    )
  }

  agregarProducto(){
    if( this.formProducto){
      this.formProducto=false
    }else{
      this.formProducto= true 
    }
   
  }

  crearProducto(){
    console.log('registrar')
    this.productosService.saveProducto(this.producto).subscribe(
     res =>{
        console.log(res);
        //localStorage.setItem("sesion",JSON.stringify(this.usuario)) 
        location.href = '/user/products'
     },
     err => console.error(err)
    );
  }

  verDetalle(id){

    this.productosService.getProducto(id).subscribe(
      res => {
        var prod = res;
        localStorage.setItem("prod",JSON.stringify(prod)) 
        location.href='/user/products/detalle'
      },
      err => console.log(err)
    )
    
  }
}
