import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { CouponService } from 'src/app/services/coupon.service';

declare const iziToast: any
declare const jQuery:any
declare const $:any

@Component({
  selector: 'app-index-coupon',
  templateUrl: './index-coupon.component.html',
  styleUrls: ['./index-coupon.component.css']
})
export class IndexCouponComponent implements OnInit {
  
  public load_data = true
  public load_btn = false

  public coupons : Array<any> = []
  
  public page = 1
  public pageSize = 5

  public filterCode = ''
  public filterType = ''

  public token : any

  constructor(
    private _couponService : CouponService,
    private _adminService : AdminService
  ) { 
    this.token = this._adminService.getToken()
  }

  ngOnInit(): void {
    this.initData()
  }

  initData(){
    this._couponService.listCoupon_filterAdmin(null, null, this.token).subscribe(
      (response:any)=>{
        
        this.coupons = response.data
        this.load_data = false
        
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  filter(type:any){
    if(type == 'code'){
      this._couponService.listCoupon_filterAdmin(type, this.filterCode, this.token).subscribe(
        (response:any)=>{
          
          this.coupons = response.data
        },
        (error)=>{
          console.log(error)
        }
      )
    }else if(type == 'type'){
      this._couponService.listCoupon_filterAdmin(type, this.filterType, this.token).subscribe(
        (response:any)=>{
          
          this.coupons = response.data
        },
        (error)=>{
          console.log(error)
        }
      )
    }
  }

  delete(id:any){
    this.load_btn = true
    this._couponService.deleteCoupon_Admin(id, this.token).subscribe(
      response => {
        iziToast.success({
          title: 'OK',
          timeout: 3000,
          position: 'topRight',
          message: 'Se elimino correctamente el cupon',
          progressBar: false,
          transitionIn: 'bounceInLeft',
          transitionOut: 'fadeOutRight'
        })

        $('#delete-'+id).modal('hide')  //Ocultar modal
        $('.modal-backdrop').removeClass('show') //Ocultar modal

        this.load_btn = false
        this.initData() //Actualizar tabla
      },
      error => {
        iziToast.error({
          title: 'ERROR',
          timeout: 3000,
          position: 'topRight',
          message: 'Ocurrio un error en el servidor',
          progressBar: false,
          transitionIn: 'bounceInLeft',
          transitionOut: 'fadeOutRight'
        })
        console.log(error);
        this.load_btn = false
      }
      
    )
  }

}
