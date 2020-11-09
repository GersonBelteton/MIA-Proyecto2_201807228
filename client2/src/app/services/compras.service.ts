import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { throwError, Observable } from 'rxjs';
import {Compra}from '../models/Compra'
@Injectable({
  providedIn: 'root'
})
export class ComprasService {


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(error.error)
    } else {
      console.error(error)
    }
    return throwError('D: Backend Error')
  }
  dir = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  addCompra(compra:Compra){
    return this.http.post(this.dir+'/addCompra', compra);
  }

  getCompra(id:any){
    return this.http.get(this.dir+'/getCompra/'+id)
  }

  existeCompra(id:any){
    return this.http.get(this.dir+'/existeCompra/'+id)
  }

  setIdCompra(idC:any,idP:any){
    return this.http.put(this.dir+'/setIdCompra?idP='+idP+'&idC='+idC,null)
  }


  setTotal(id:any){
    return this.http.put(this.dir+'/setTotal/'+id,null)
  }
  getProductos(id:any){
    return this.http.get(this.dir+'/getProductsCompra/'+id)
  }

  getTotal(id:any){
    return this.http.get(this.dir+'/getTotal/'+id)
  }

  limpiarCarro(id:any){
    return this.http.put(this.dir+'/limpiarCarro/'+id,null)
  }
}
