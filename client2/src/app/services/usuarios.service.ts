import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import {Usuario} from '../models/usuario'
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Login} from '../models/Login'
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {




    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  
    private handleError(error:HttpErrorResponse) {
      if(error.error instanceof ErrorEvent) {
        console.log(error.error)
      } else {
        console.error(error)
      }
      return throwError('D: Backend Error')
    }
  dir = 'http://localhost:3000'
  constructor(private http:HttpClient) { }

  getUsuarios(){
    return this.http.get(`${this.dir}/p`)
  }


  buscarUsuario(correo:any){
    return this.http.get(this.dir+'/existeUsuario/'+correo)
  }
  saveUsuario(usuario:Usuario){
    return this.http.post(this.dir+'/addUser', usuario);
  }

  updateUsuario(usuario:Usuario){
    return this.http.patch(this.dir+'/updateUser',usuario)
  }
  guardarFoto(url:any,id:number){
    return this.http.put(this.dir+'/usuario/insertarImagen/'+id, url)
  }

  public auth(data:any):Observable<Login> {
    let url = this.dir+'/login';
    return this.http.post(url,data,  this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  public auth2(data:any):Observable<Login> {
    let url = this.dir+'/login/log2';
    return this.http.post(url,data,  this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }
 

  public getAll():Observable<any> {
    let url = this.dir+'/login';
    return this.http.get(url, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }


  

  login(login:any){
    return this.http.post(this.dir+'/login',login);
  }
}
