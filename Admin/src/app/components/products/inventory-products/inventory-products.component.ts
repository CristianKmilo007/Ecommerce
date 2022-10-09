import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';

declare const iziToast: any
declare const jQuery:any
declare const $:any

@Component({
  selector: 'app-inventory-products',
  templateUrl: './inventory-products.component.html',
  styleUrls: ['./inventory-products.component.css']
})
export class InventoryProductsComponent implements OnInit {

  public id : any
  public token : any
  public idUser : any

  public product : any = {}
  public inventory : Array<any> = []
  public inventoryUp : any = {}

  public load_data = true
  public load_btn = false

  constructor(
    private _route : ActivatedRoute,
    private _productService : ProductService,
    private _adminService : AdminService
  ) { 
    this.token = this._adminService.getToken()
    this.idUser = localStorage.getItem('_id')
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
              this._productService.listInventory_productAdmin(this.product._id, this.token).subscribe(
                response => {
                  this.inventory = response.data  
                  this.load_data = false   
                },
                error => {
                  console.log(error);
                  
                }
              )
            }
          },
          error => {
            console.log(error)
          }
        )
      }
    )
  }

  delete(id:any){
    this.load_btn = true
    this._productService.deleteInventory_productAdmin(id, this.token).subscribe(
      response => {
        iziToast.success({
          title: 'OK',
          timeout: 3000,
          position: 'topRight',
          message: 'Se elimino correctamente el ingreso',
          progressBar: false,
          transitionIn: 'bounceInLeft',
          transitionOut: 'fadeOutRight'
        })

        $('#delete-'+id).modal('hide')  //Ocultar modal
        $('.modal-backdrop').removeClass('show') //Ocultar modal

        this.load_btn = false
        this._productService.listInventory_productAdmin(this.product._id, this.token).subscribe(
          response => {
            this.inventory = response.data 
            this.load_data = false 
          },
          error => {
            console.log(error);
            
          }
        ) //Actualizar tabla
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

  registerInventory(inventoryForm:any){
    this.load_btn = true
    if(inventoryForm.valid){
      
      let data = {
        product: this.product._id,
        stock: inventoryForm.value.stock,
        admin: this.idUser,
        supplier: inventoryForm.value.supplier

      }
      this.load_btn = true
      this._productService.registerInventory_productAdmin(data, this.token).subscribe(
        response => {
          iziToast.success({
            title: 'OK',
            timeout: 3000,
            position: 'topRight',
            message: 'Se ingreso correctamente la cantidad',
            progressBar: false,
            transitionIn: 'bounceInLeft',
            transitionOut: 'fadeOutRight'
          })

          this.load_btn = false
          

          this._productService.listInventory_productAdmin(this.product._id, this.token).subscribe(
            response => {
              this.inventory = response.data 
              this.load_data = false 
            },
            error => {
              console.log(error);
              
            }
          ) //Actualizar tabla

          inventoryForm.reset()
        },
        error => {

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
