import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
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

  topLike(){
    return this.http.get(this.dir+'/topLike')
  }

  topDislike(){
    return this.http.get(this.dir+'/topDislike')
  }

  topClienteMasCredito(){
    return this.http.get(this.dir+'/topClienteMasCredito')
  }
  topClienteMenosCredito(){
    return this.http.get(this.dir+'/topClienteMenosCredito')
  }

  topClientePublicacion(){
    return this.http.get(this.dir+'/topClientePublicacion')
  }

  topPaises(){
    return this.http.get(this.dir+'/topPaises')
  }

  
}
