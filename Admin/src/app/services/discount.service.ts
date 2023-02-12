import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  public URI_DISCOUNT_BACKEND

  constructor(
    private _http: HttpClient
  ) { 
    this.URI_DISCOUNT_BACKEND = GLOBAL.uriDiscount
  }

  listDiscount_Admin(filter:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.get(`${this.URI_DISCOUNT_BACKEND}/listDiscount_Admin/${filter}`, {headers:headers})
  }

  deleteDiscount_Admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.delete(`${this.URI_DISCOUNT_BACKEND}/deleteDiscount_Admin/${id}`, {headers:headers})
  }

  registerDiscount_Admin(data:any, file:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'authorization':token})

    const fd = new FormData()
    fd.append('title', data.title)
    fd.append('discount', data.discount)
    fd.append('dateInit', data.dateInit)
    fd.append('dateFinish', data.dateFinish)
    /* fd.append('laboratory', data.laboratory) */
    fd.append('banner', file)

    return this._http.post(`${this.URI_DISCOUNT_BACKEND}/registerDiscount_Admin`, fd, {headers:headers})
  }
  
  getDiscount_Admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.get(`${this.URI_DISCOUNT_BACKEND}/getDiscount_Admin/${id}`, {headers:headers})
  }

  updateDiscount_Admin(data:any, id:any, token:any):Observable<any>{
    
    if(data.banner){
      let headers = new HttpHeaders({'authorization':token})

      const fd = new FormData()
      fd.append('title', data.title)
      fd.append('dateInit', data.dateInit)
      fd.append('dateFinish', data.dateFinish)
      fd.append('discount', data.discount)
      fd.append('banner', data.banner)

      return this._http.put(`${this.URI_DISCOUNT_BACKEND}/updateDiscount_Admin/${id}`, fd, {headers:headers})
    }else{
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
      return this._http.put(`${this.URI_DISCOUNT_BACKEND}/updateDiscount_Admin/${id}`, data, {headers:headers})
    }   
  }

  
  

}
