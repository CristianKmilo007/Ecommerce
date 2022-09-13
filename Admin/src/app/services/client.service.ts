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

  listClient_filterAdmin():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.get(`${this.URI_CLIENT_BACKEND}/listClient_filterAdmin`, {headers:headers})
  }

}