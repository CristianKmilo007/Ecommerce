import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url

  constructor(
    private _http: HttpClient
  ) { 
    this.url = GLOBAL.url
  }

  loginAdmin(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(`${this.url}/loginAdmin`, data, {headers:headers})
  }

  getToken(){
    return localStorage.getItem('token')
  }

}
