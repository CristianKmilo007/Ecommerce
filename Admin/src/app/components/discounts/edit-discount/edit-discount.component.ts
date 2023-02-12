import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { DiscountService } from 'src/app/services/discount.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare const iziToast: any
declare const jQuery:any
declare const $:any

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.css']
})
export class EditDiscountComponent implements OnInit {

  public discount:any = {}
  public config: any = {}

  public file : any = undefined
  public imgSelect : any | ArrayBuffer = '../../../../assets/img/default.jpg'
  public load_btn = false
  public load_data = true

  public token:any
  public id: any

  public URI_DISCOUNT_BACKEND

  constructor(
    private _discountService : DiscountService,
    private _adminService : AdminService,
    private _router : Router,
    private _route : ActivatedRoute
  ) { 
    this.token = this._adminService.getToken()
    this.URI_DISCOUNT_BACKEND = GLOBAL.uriDiscount

    this._adminService.getConfig_Public().subscribe(
      response => {
        this.config = response.data
        
      },
      error => {
        console.log(error);
        
      }
    )
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params =>{
        this.id = params['id']
        this._discountService.getDiscount_Admin(this.id, this.token).subscribe(
          response => {

            if(response.data == undefined){
              this.discount = response.undefined
              this.load_data = false
              
            }else{
              
              this.discount = response.data
              this.imgSelect = `${this.URI_DISCOUNT_BACKEND}/getBanner_discount/${this.discount.banner}`  
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
      if(this.discount.discount >=1 && this.discount.discount <= 100){
        this.load_btn = true
      var data : any = {}

      if(this.file != undefined){
        data.banner = this.file
      }

      data.title = this.discount.title
      data.dateInit = this.discount.dateInit
      data.dateFinish = this.discount.dateFinish
      data.discount = this.discount.discount
      

      this.load_btn = true
      this._discountService.updateDiscount_Admin(data, this.id, this.token).subscribe(
        response => {
          iziToast.success({
            title: 'OK',
            timeout: 3000,
            position: 'topRight',
            message: 'Descuento actualizado correctamente',
            progressBar: false,
            transitionIn: 'bounceInLeft',
            transitionOut: 'fadeOutRight'
          })
          
            this.load_btn = false
          

          this._router.navigate(['/panel/discounts'])
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
          message: 'El porcentaje del descuento no es valido',
          progressBar: false,
          transitionIn: 'bounceInLeft',
          transitionOut: 'fadeOutRight'
        })
        this.load_btn = false
      }
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

  fileChangeEvent(event:any):void{
    
    let file : any

    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0]
      
    }else{
      iziToast.error({
        title: 'ERROR',
        timeout: 3000,
        position: 'topRight',
        message: 'Imagen no valida',
        progressBar: false,
        transitionIn: 'bounceInLeft',
        transitionOut: 'fadeOutRight'
      })
    }

    if(file.size <= 4000000){

      if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg'){

        const reader = new FileReader()
        reader.onload = e => this.imgSelect = reader.result
        reader.readAsDataURL(file)

        $('#input-frontPage').text(file.name)
        this.file = file

      }else{
        iziToast.error({
          title: 'ERROR',
          timeout: 3000,
          position: 'topRight',
          message: 'Imagen no valida',
          progressBar: false,
          transitionIn: 'bounceInLeft',
          transitionOut: 'fadeOutRight'
        })
        $('#input-frontPage').text('Seleccionar imagen')
        this.imgSelect = '../../../../assets/img/default.jpg'
        this.file = undefined
      }

    }else{
      iziToast.error({
        title: 'ERROR',
        timeout: 3000,
        position: 'topRight',
        message: 'La imagen supera los 4MB',
        progressBar: false,
        transitionIn: 'bounceInLeft',
        transitionOut: 'fadeOutRight'
      })
      $('#input-frontPage').text('Seleccionar imagen')
      this.imgSelect = '../../../../assets/img/default.jpg'
      this.file = undefined
    }
    
  }

}
