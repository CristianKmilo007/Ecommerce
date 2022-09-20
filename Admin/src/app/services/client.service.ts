import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";

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

  listClient_filterAdmin(type:any, filter:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.get(`${this.URI_CLIENT_BACKEND}/listClient_filterAdmin/${type}/${filter}`, {headers:headers})
  }

  registerClient_Admin(data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.post(`${this.URI_CLIENT_BACKEND}/registerClient_Admin`, data, {headers:headers})
  }

  getClient_Admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.get(`${this.URI_CLIENT_BACKEND}/getClient_Admin/${id}`, {headers:headers})
  }

  updateClient_Admin(id:any, data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.put(`${this.URI_CLIENT_BACKEND}/updateClient_Admin/${id}`, data, {headers:headers})
  }

}