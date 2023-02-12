import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { DiscountService } from 'src/app/services/discount.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare const iziToast: any
declare const jQuery:any
declare const $:any

@Component({
  selector: 'app-index-discount',
  templateUrl: './index-discount.component.html',
  styleUrls: ['./index-discount.component.css']
})
export class IndexDiscountComponent implements OnInit {

  public discounts : Array<any> = []

  public filterDiscount = ''


  public page = 1
  public pageSize = 5

  public token : any

  public load_data = true
  public load_btn = false

  public URI_DISCOUNT_BACKEND

  constructor(
    private _discountService : DiscountService,
    private _adminService : AdminService
  ) { 
    this.token = this._adminService.getToken()
    this.URI_DISCOUNT_BACKEND = GLOBAL.uriDiscount
  }

  ngOnInit(): void {
    this.initData()
  }

  initData(){
    this._discountService.listDiscount_Admin(this.filterDiscount, this.token).subscribe(
      (response:any)=>{
        this.discounts = response.data  
        this.discounts.forEach(element => {
          let tt_init = Date.parse(element.dateInit+'T00:00:00')/1000
          let tt_finish = Date.parse(element.dateFinish+'T00:00:00')/1000

          let today = Date.parse(new Date().toString())/1000

          if(today >= tt_init){
            element.state = 'Expirado'
          }
          if(today < tt_init){
            element.state = 'Proximamente'
          }
          if(today >= tt_init && today <= tt_finish){
            element.state = 'En progreso'
          }
          
        })
        
        this.load_data = false
        
        
      },
      (error)=>{
        console.log(error);      
      }
    )
  }

  filter(){
    if(this.filterDiscount){
      this._discountService.listDiscount_Admin(this.filterDiscount, this.token).subscribe(
        (response:any)=>{
          this.discounts = response.data
        },
        (error)=>{
          console.log(error);
          
        }
      )
    }
  }

  delete(id:any){
    this.load_btn = true
    this._discountService.deleteDiscount_Admin(id, this.token).subscribe(
      response => {
        iziToast.success({
          title: 'OK',
          timeout: 3000,
          position: 'topRight',
          message: 'Se elimino correctamente el descuento',
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
