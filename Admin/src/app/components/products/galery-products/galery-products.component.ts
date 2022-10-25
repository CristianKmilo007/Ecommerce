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
  selector: 'app-galery-products',
  templateUrl: './galery-products.component.html',
  styleUrls: ['./galery-products.component.css']
})
export class GaleryProductsComponent implements OnInit {

  public product : any = {}

  public id : any
  public token : any
  public file : any = undefined
  public imgSelect : any | ArrayBuffer = ''

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
        
        this.init_data()
        
      }
    )
  }

  init_data(){
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

  add_newImage(){
    if(this.file != undefined){
      let data = {
        image: this.file,
        _id : uuidv4()
      }
      console.log(data);
      
      this._productService.addImage_galleryAdmin(this.id, data, this.token).subscribe(
        response => {
          this.init_data()
          $('.cs-file-drop-message').text("Arrastre una imagen")
          $('#input-img').val('')
          this.imgSelect = ''
          this.file = undefined
        },
        error => {

        }
      )
    }else{
      iziToast.error({
        title: 'ERROR',
        timeout: 3000,
        position: 'topRight',
        message: 'Debes añadir una imagen a la galeria',
        progressBar: false,
        transitionIn: 'bounceInLeft',
        transitionOut: 'fadeOutRight'
      })
    }
  }

  delete(id:any){
    this.load_btn = true
    this._productService.deleteImage_galleryAdmin(this.id,{_id:id}, this.token).subscribe(
      response => {
        iziToast.success({
          title: 'OK',
          timeout: 3000,
          position: 'topRight',
          message: 'Se elimino correctamente la imagen',
          progressBar: false,
          transitionIn: 'bounceInLeft',
          transitionOut: 'fadeOutRight'
        })

        $('#delete-'+id).modal('hide')  //Ocultar modal
        $('.modal-backdrop').removeClass('show') //Ocultar modal

        this.load_btn = false
        this.init_data() //Actualizar tabla
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
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded')
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload')
        reader.readAsDataURL(file)

        $('.cs-file-drop-message').text(file.name)
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
        $('.cs-file-drop-message').text("Arrastre una imagen")
        $('#input-img').val('')
        this.imgSelect = ''
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
        $('.cs-file-drop-message').text("Arrastre una imagen")
        $('#input-img').val('')
        this.imgSelect = ''
        this.file = undefined
      }

      console.log(this.file);
      

  }
  

  ngDoCheck():void{

    if (this.imgSelect == '') {

      $('.cs-file-drop-preview').html('<i class="material-symbols-rounded " >file_upload</i>').removeClass("img-thumbnail rounded")
    } else {
      $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">").addClass("img-thumbnail rounded")
    }
    
  }

}
