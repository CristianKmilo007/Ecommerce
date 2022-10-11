import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  public URI_COUPON_BACKEND

  constructor(
    private _http: HttpClient
  ) { 
    this.URI_COUPON_BACKEND = GLOBAL.uriCoupon
  }

  registerCoupon_Admin(data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.post(`${this.URI_COUPON_BACKEND}/registerCoupon_Admin`, data, {headers:headers})
  }

  listCoupon_filterAdmin(type:any, filter:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.get(`${this.URI_COUPON_BACKEND}/listCoupon_filterAdmin/${type}/${filter}`, {headers:headers})
  }

  getCoupon_Admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.get(`${this.URI_COUPON_BACKEND}/getCoupon_Admin/${id}`, {headers:headers})
  }

  updateCoupon_Admin(id:any, data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.put(`${this.URI_COUPON_BACKEND}/updateCoupon_Admin/${id}`, data, {headers:headers})
  }

  deleteCoupon_Admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'authorization':token})
    return this._http.delete(`${this.URI_COUPON_BACKEND}/deleteCoupon_Admin/${id}`, {headers:headers})
  }
 
}
