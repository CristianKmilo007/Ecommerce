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
  public URI_CONFIG_BACKEND
  public URI_PRODUCT_BACKEND
  public URI_CART_BACKEND

  constructor(
    private _http: HttpClient
  ) { 
    this.URI_CLIENT_BACKEND = GLOBAL.uriClient
    this.URI_CONFIG_BACKEND = GLOBAL.uriConfig
    this.URI_PRODUCT_BACKEND = GLOBAL.uriProduct
    this.URI_CART_BACKEND = GLOBAL.uriCart
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

  getConfig_Public():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.get(`${this.URI_CONFIG_BACKEND}/getConfig_Public`, {headers:headers})
  }

  listProducts_filterPublic(filter:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.get(`${this.URI_PRODUCT_BACKEND}/listProducts_filterPublic/${filter}`, {headers:headers})
  }

  getProducts_slugPublic(slug:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.get(`${this.URI_PRODUCT_BACKEND}/getProducts_slugPublic/${slug}`, {headers:headers})
  }

  listProducts_recomendedPublic(laboratory:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.get(`${this.URI_PRODUCT_BACKEND}/listProducts_recomendedPublic/${laboratory}`, {headers:headers})
  }

  addCart_client(data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.post(`${this.URI_CART_BACKEND}/addCart_client`, data, {headers:headers})
  }

  getCart_client(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.get(`${this.URI_CART_BACKEND}/getCart_client/${id}`, {headers:headers})
  }

  deleteCart_client(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.delete(`${this.URI_CART_BACKEND}/deleteCart_client/${id}`, {headers:headers})
  }
  
  

}
