import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductService } from 'src/app/services/product.service';
import { v4 as uuidv4 } from "uuid";

declare const iziToast: any
declare const jQuery:any
declare const $:any

@Component({
  selector: 'app-variety-products',
  templateUrl: './variety-products.component.html',
  styleUrls: ['./variety-products.component.css']
})
export class VarietyProductsComponent implements OnInit {

  public product : any = {}

  public id : any
  public token : any
  public newVariety = ''

  public load_btn = false
  public load_data = true

  public URI_PRODUCT_BACKEND

  constructor(
    private _productService: ProductService,
    private _adminService: AdminService,
    private _route: ActivatedRoute
  ) { 
    this.token = this._adminService.getToken()
    this.URI_PRODUCT_BACKEND = GLOBAL.uriProduct
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params =>{
        this.id = params['id']
        
        this._productService.getProduct_Admin(this.id, this.token).subscribe(
          response => {

            if(response.data == undefined){
              this.product = response.undefined           
            }else{  
              
              this.product = response.data
              
            }
          },
          error => {
            console.log(error)
          }
        )
      }
    )
  }

  add_newVariety(){
    if(this.newVariety){

      this.product.varieties.push({
        titleVariety: this.newVariety,
        _id: uuidv4()
      })

      this.newVariety = ''
    }else{
      iziToast.error({
        title: 'ERROR',
        timeout: 3000,
        position: 'topRight',
        message: 'Debe ingresar una nueva variedad',
        progressBar: false,
        transitionIn: 'bounceInLeft',
        transitionOut: 'fadeOutRight'
      })
    }
  }

  delete(idx:any){
    this.load_btn = true
    this.product.varieties.splice(idx, 1)
    
    $('#delete-'+idx).modal('hide')  //Ocultar modal
    $('.modal-backdrop').removeClass('show') //Ocultar modal

    this.load_btn = false
  }

  update(){
    if(this.product.titleVariety){

      if(this.product.varieties.length >= 1){
        this.load_btn = true
        this._productService.updateVariety_productAdmin({
          titleVariety: this.product.titleVariety,
          varieties: this.product.varieties
        }, this.id, this.token).subscribe(
          response => {
            iziToast.success({
              title: 'OK',
              timeout: 3000,
              position: 'topRight',
              message: 'Se actualizo correctamente las variedades del producto',
              progressBar: false,
              transitionIn: 'bounceInLeft',
              transitionOut: 'fadeOutRight'
            })
            this.load_btn = false
          },
          error => {

          }
          
        )
      }else{
        iziToast.error({
          title: 'ERROR',
          timeout: 3000,
          position: 'topRight',
          message: 'Debe ingresar una nueva variedad',
          progressBar: false,
          transitionIn: 'bounceInLeft',
          transitionOut: 'fadeOutRight'
        })
      }

    }else{
      iziToast.error({
        title: 'ERROR',
        timeout: 3000,
        position: 'topRight',
        message: 'Debe ingresar el nombre de la variedad',
        progressBar: false,
        transitionIn: 'bounceInLeft',
        transitionOut: 'fadeOutRight'
      })
    }
  }

}
