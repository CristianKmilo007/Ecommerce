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
  public URI_CONFIG_BACKEND

  constructor(
    private _http: HttpClient
  ) { 
    this.URI_ADMIN_BACKEND = GLOBAL.uriAdmin,
    this.URI_CONFIG_BACKEND = GLOBAL.uriConfig
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

  getConfig_Admin(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.get(`${this.URI_CONFIG_BACKEND}/getConfig_Admin`, {headers:headers})
  }

  updateConfig_Admin(id:any, data:any, token:any):Observable<any>{

    if(data.logo){
      let headers = new HttpHeaders({'authorization':token})

      const fd = new FormData()
      fd.append('nameBusiness', data.nameBusiness)
      fd.append('serie', data.serie)
      fd.append('correlative', data.correlative)
      fd.append('laboratories', JSON.stringify(data.laboratories))
      fd.append('logo', data.logo)

      return this._http.put(`${this.URI_CONFIG_BACKEND}/updateConfig_Admin/${id}`, fd, {headers:headers})
    }else{
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
      return this._http.put(`${this.URI_CONFIG_BACKEND}/updateConfig_Admin/${id}`, data, {headers:headers})
    }
  
  }

  getConfig_Public():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.get(`${this.URI_CONFIG_BACKEND}/getConfig_Public`, {headers:headers})
  }

  deleteLaboratories_Admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.delete(`${this.URI_CONFIG_BACKEND}/deleteLaboratories_Admin/${id}`, {headers:headers})
  }

}

