import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductService } from 'src/app/services/product.service';

declare const iziToast: any
declare const jQuery:any
declare const $:any

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {

  public product : any = {}
  public config : any = {}

  public imgSelect : any | ArrayBuffer
  public load_btn = false
  public id:any
  public token : any
  public load_data = true
  public URI_PRODUCT_BACKEND
  public file : any = undefined

  constructor(
    private _route : ActivatedRoute,
    private _productService : ProductService,
    private _adminService : AdminService,
    private _router : Router
  ) { 
    this.token = this._adminService.getToken()
    this.URI_PRODUCT_BACKEND = GLOBAL.uriProduct

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
        this._productService.getProduct_Admin(this.id, this.token).subscribe(
          response => {

            if(response.data == undefined){
              this.product = response.undefined
              this.load_data = false
              
            }else{
              
              this.product = response.data
              this.imgSelect = `${this.URI_PRODUCT_BACKEND}/getFrontPage/${this.product.image}`  
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
      var data : any = {}

      if(this.file != undefined){
        data.image = this.file
      }

      data.title = this.product.title
      data.stock = this.product.stock
      data.price = this.product.price
      data.laboratory = this.product.laboratory
      data.description = this.product.description

      this.load_btn = true
      this._productService.updateProduct_Admin(data, this.id, this.token).subscribe(
        response => {
          iziToast.success({
            title: 'OK',
            timeout: 3000,
            position: 'topRight',
            message: 'Producto actualizado correctamente',
            progressBar: false,
            transitionIn: 'bounceInLeft',
            transitionOut: 'fadeOutRight'
          })
          
            this.load_btn = false
          

          this._router.navigate(['/panel/products'])
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
