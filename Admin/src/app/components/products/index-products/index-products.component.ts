import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductService } from 'src/app/services/product.service';

declare const iziToast: any
declare const jQuery:any
declare const $:any

@Component({
  selector: 'app-index-products',
  templateUrl: './index-products.component.html',
  styleUrls: ['./index-products.component.css']
})
export class IndexProductsComponent implements OnInit {

  public products : Array<any> = []

  public filterTitle = ''
  public filterLaboratory = ''

  public page = 1
  public pageSize = 5

  public token : any

  public load_data = true

  public URI_PRODUCT_BACKEND

  constructor(
    private _productService : ProductService,
    private _adminService : AdminService
  ) { 
    this.token = this._adminService.getToken()
    this.URI_PRODUCT_BACKEND = GLOBAL.uriProduct
  }

  ngOnInit(): void {
    this.initData()
  }

  initData(){
    this._productService.listProducts_filterAdmin(null, null, this.token).subscribe(
      (response:any)=>{
        this.products = response.data
        this.load_data = false
      },
      (error)=>{
        console.log(error);      
      }
    )
  }

  filter(type:any){
    if(type == 'title'){
      this._productService.listProducts_filterAdmin(type, this.filterTitle, this.token).subscribe(
        (response:any)=>{
          this.products = response.data
        },
        (error)=>{
          console.log(error);
          
        }
      )
    }else if(type == 'laboratory'){
      this._productService.listProducts_filterAdmin(type, this.filterLaboratory, this.token).subscribe(
        (response:any)=>{
          this.products = response.data
        },
        (error)=>{
          console.log(error);
          
        }
      )
    }
  }

  delete(id:any){
    this._productService.deleteProduct_Admin(id, this.token).subscribe(
      response => {
        iziToast.success({
          title: 'OK',
          timeout: 3000,
          position: 'topRight',
          message: 'Se elimino correctamente el producto',
          progressBar: false,
          transitionIn: 'bounceInLeft',
          transitionOut: 'fadeOutRight'
        })

        $('#delete-'+id).modal('hide')  //Ocultar modal
        $('.modal-backdrop').removeClass('show') //Ocultar modal

        this.initData() //Actualizar tabla
      },
      error => {
        console.log(error);
        
      }
      
    )
  }

}
