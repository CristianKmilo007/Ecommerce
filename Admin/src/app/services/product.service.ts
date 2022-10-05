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

  listProducts_filterAdmin(type:any, filter:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.get(`${this.URI_PRODUCT_BACKEND}/listProducts_filterAdmin/${type}/${filter}`, {headers:headers})
  }

  deleteProduct_Admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.delete(`${this.URI_PRODUCT_BACKEND}/deleteProduct_Admin/${id}`, {headers:headers})
  }

  getProduct_Admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.get(`${this.URI_PRODUCT_BACKEND}/getProduct_Admin/${id}`, {headers:headers})
  }

  updateProduct_Admin(data:any, id:any, token:any):Observable<any>{
    
    if(data.image){
      let headers = new HttpHeaders({'authorization':token})

      const fd = new FormData()
      fd.append('title', data.title)
      fd.append('stock', data.stock)
      fd.append('price', data.price)
      fd.append('description', data.description)
      fd.append('laboratory', data.laboratory)
      fd.append('image', data.image)

      return this._http.put(`${this.URI_PRODUCT_BACKEND}/updateProduct_Admin/${id}`, fd, {headers:headers})
    }else{
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
      return this._http.put(`${this.URI_PRODUCT_BACKEND}/updateProduct_Admin/${id}`, data, {headers:headers})
    }

    
  }

}
