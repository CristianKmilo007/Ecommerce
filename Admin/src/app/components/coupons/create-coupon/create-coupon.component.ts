import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CouponService } from 'src/app/services/coupon.service';

declare const iziToast: any

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent implements OnInit {

  public coupon : any = {type:''}
  public load_btn = false

  public token:any

  constructor(
    private _couponService : CouponService,
    private _adminService : AdminService,
    private _router : Router
  ) { 
    this.token = this._adminService.getToken()
  }

  ngOnInit(): void {
  }

  register(registerForm: any){
    
    if(registerForm.valid){
      this.load_btn = true
      this._couponService.registerCoupon_Admin(this.coupon, this.token).subscribe(
        response =>{
          iziToast.success({
            title: 'OK',
            timeout: 3000,
            position: 'topRight',
            message: 'Se creo correctamente el nuevo cupon',
            progressBar: false,
            transitionIn: 'bounceInLeft',
            transitionOut: 'fadeOutRight'
          })

          registerForm.reset()
    
          this.load_btn = false
          
          this._router.navigate(['/panel/coupons'])
          
        },
        error => {
          console.log(error);
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
    }
  }
}
