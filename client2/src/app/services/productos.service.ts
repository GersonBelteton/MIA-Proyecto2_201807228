import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto } from '../models/producto'
import {Like} from '../models/like'
import {Dislike} from '../models/dislike'
import {Comentario} from '../models/comentario'
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

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


  getProductos(){
    return this.http.get(`${this.dir}/getProducts`)
  }

  getLikes(id:any){
    return this.http.get(`${this.dir}/getLikes/`+id)
  }
  
  existeLike(idU:any,idP){
    return this.http.get(this.dir+'/existeLike?idP='+idP+'&idU='+idU)
  }

  addLike(like:Like){
    return this.http.post(this.dir+'/addLike', like);
  }

  addDislike(dislike:Dislike){
    return this.http.post(this.dir+'/addDislike', dislike);
  }
  getDislikes(id:any){
    return this.http.get(`${this.dir}/getDislikes/`+id)
  }
  
  existeDislike(idU:any,idP){
    return this.http.get(this.dir+'/existeDislike?idP='+idP+'&idU='+idU)
  }
  quitarlike(idU:any,idP:any){
    return this.http.delete(this.dir+'/deleteLike?idP='+idP+'&idU='+idU)
  }

  quitardislike(idU:any,idP:any){
    return this.http.delete(this.dir+'/deleteDislike?idP='+idP+'&idU='+idU)
  }
  getProducto(id:any){
    return this.http.get(this.dir+'/getProduct/'+id)
  }

  saveProducto(producto:Producto){
    return this.http.post(this.dir+'/addProduct', producto);
  }

  getComentarios(id:any){
    return this.http.get(this.dir+'/getComents/'+id);
  }

  saveComentario(comentario:Comentario){
    return this.http.post(this.dir+'/addComent',comentario)
  }

}
