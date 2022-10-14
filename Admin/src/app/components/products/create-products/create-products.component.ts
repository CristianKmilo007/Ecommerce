import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';

declare const iziToast: any
declare const jQuery:any
declare const $:any

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent implements OnInit {

  public product:any = {laboratory:''}
  public config: any = {}

  public file : any = undefined
  public imgSelect : any | ArrayBuffer = '../../../../assets/img/default.jpg'
  public load_btn = false

  public token:any

  constructor(
    private _productService : ProductService,
    private _adminService : AdminService,
    private _router : Router
  ) { 
    this.token = this._adminService.getToken()

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
  }

  register(registerForm:any){
    if (registerForm.valid) {
      if(this.file != undefined){
        this.load_btn = true
        this._productService.registerProduct_Admin(this.product, this.file, this.token).subscribe(
        response =>{
          iziToast.success({
            title: 'OK',
            timeout: 3000,
            position: 'topRight',
            message: 'Se registro correctamente el nuevo producto',
            progressBar: false,
            transitionIn: 'bounceInLeft',
            transitionOut: 'fadeOutRight'
          })

          registerForm.reset()
    
          this.load_btn = false
          
          this._router.navigate(['/panel/products'])
          
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
          message: 'Debes subir una imagen para registrar el producto',
          progressBar: false,
          transitionIn: 'bounceInLeft',
          transitionOut: 'fadeOutRight'
        })
      }
      
    } else {
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
