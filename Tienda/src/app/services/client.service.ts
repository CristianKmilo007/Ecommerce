import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public URI_CLIENT_BACKEND

  constructor(
    private _http: HttpClient
  ) { 
    this.URI_CLIENT_BACKEND = GLOBAL.uriClient
  }

  loginClient(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type' , 'application/json')
    return this._http.post(`${this.URI_CLIENT_BACKEND}/loginClient`, data,  {headers:headers})
  }

  getClient_Public(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.get(`${this.URI_CLIENT_BACKEND}/getClient_Public/${id}`, {headers:headers})
  }

  updateProfile_clientPublic(id:any, data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.put(`${this.URI_CLIENT_BACKEND}/updateProfile_clientPublic/${id}`, data,  {headers:headers})
  }

  public isAuthenticated():boolean{  //validar el token
 
    const token = localStorage.getItem('token'); //obtener el token
 
    if(!token){  //si no hay un token no da ingreso
      return false;
    }
    
    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(<any>token);
      
      if(helper.isTokenExpired(token)){
        localStorage.clear()
        return false
      }

      if(!decodedToken){
        localStorage.clear()
        return false;
      }
    } catch (error) {
      localStorage.clear()
      return false;
    }
 
    return true
  }

  

}
