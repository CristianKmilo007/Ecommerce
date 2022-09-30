import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public URI_PRODUCT_BACKEND

  constructor(
    private _http: HttpClient
  ) { 
    this.URI_PRODUCT_BACKEND = GLOBAL.uriProduct
  }

  registerProduct_Admin(data:any, file:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'authorization':token})

    const fd = new FormData()
    fd.append('title', data.title)
    fd.append('stock', data.stock)
    fd.append('price', data.price)
    fd.append('description', data.description)
    fd.append('laboratory', data.laboratory)
    fd.append('image', file)

    return this._http.post(`${this.URI_PRODUCT_BACKEND}/registerProduct_Admin`, fd, {headers:headers})
  }

}
