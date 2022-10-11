import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CouponService } from 'src/app/services/coupon.service';

declare const iziToast: any
declare const jQuery:any
declare const $:any

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.css']
})
export class EditCouponComponent implements OnInit {

  public coupon : any = {type:''}
  public load_btn = false
  public load_data = true

  public token:any
  public id : any

  constructor(
    private _couponService : CouponService,
    private _adminService : AdminService,
    private _router : Router,
    private _route : ActivatedRoute
  ) { 
    this.token = this._adminService.getToken()
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params =>{
        this.id = params['id']
        this._couponService.getCoupon_Admin(this.id, this.token).subscribe(
          response => {

            if(response.data == undefined){
              this.coupon = response.undefined
              this.load_data = false
              
            }else{
              
              this.coupon = response.data
              this.load_data = false   
            }
          },
          error => {
            console.log(error)
          }
        )
      }
    )
  }

  update(updateForm:any){
    if(updateForm.valid){
      this.load_btn = true
      this._couponService.updateCoupon_Admin(this.id, this.coupon, this.token).subscribe(
        response => {
          iziToast.success({
            title: 'OK',
            timeout: 3000,
            position: 'topRight',
            message: 'Cupon actualizado correctamente',
            progressBar: false,
            transitionIn: 'bounceInLeft',
            transitionOut: 'fadeOutRight'
          })
          
            this.load_btn = false
          

          this._router.navigate(['/panel/coupons'])
        },
        error => {
          console.log(error)
          this.load_btn = false
        }
      )
    }else{
      iziToast.error({
        title: 'ERROR',
        timeout: 3000,
        position: 'topRight',
        message: 'Los datos del formulario no son validos',
        progressBar: false,
        transitionIn: 'bounceInLeft',
        transitionOut: 'fadeOutRight'
      })
      this.load_btn = false
    }
  }
}
