import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public URI_ADMIN_BACKEND

  constructor(
    private _http: HttpClient
  ) { 
    this.URI_ADMIN_BACKEND = GLOBAL.uriAdmin
  }

  loginAdmin(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(`${this.URI_ADMIN_BACKEND}/loginAdmin`, data, {headers:headers})
  }

  getToken(){
    return localStorage.getItem('token')
  }


  public isAuthenticated(allowRoles : string[]):boolean{  //validar el token
 
    const token = localStorage.getItem('token'); //obtener el token
 
    if(!token){  //si no hay un token no da ingreso
      return false;
    }
    
    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(<any>token);      
      if(!decodedToken){
        localStorage.removeItem('token');
        return false;
      }
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }
 
    return allowRoles.includes(decodedToken['role']);
  }

}

