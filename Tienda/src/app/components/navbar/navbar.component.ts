import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from 'socket.io-client'

declare const $ : any
declare const iziToast : any

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public token:any
  public id:any
  public user : any = undefined
  public user_lc : any = undefined
  public config: any = {}

  public products : Array <any> = []
  public cartMod : Array <any> = []

  public subtotal = 0
  public socket = io('http://localhost:5000')

  public filter_product = ''

  public op_cart = false

  public URI_PRODUCT_BACKEND : any

  constructor(
    private _clientService : ClientService,
    private _router : Router
  ) {
    this.token = localStorage.getItem('token')
    this.id = localStorage.getItem('_id')
    this.URI_PRODUCT_BACKEND = GLOBAL.uriProduct

    this._clientService.getConfig_Public().subscribe(
      response => {
        this.config = response.data
        
      },
      error => {
        console.log(error);
        
      }
    )

    this._clientService.listProducts_filterPublic(this.filter_product).subscribe(
      response => {
        this.products = response.data
      }
    )

    if(this.token){
      this._clientService.getClient_Public(this.id, this.token).subscribe(
        response => {
          this.user = response.data
          localStorage.setItem('userData', JSON.stringify(this.user) )
          if(localStorage.getItem('userData')){
            let userData : any = localStorage.getItem('userData')
            this.user_lc = JSON.parse(userData)

            this.getCart_client()
          }else{
            this.user_lc = undefined
          }
        },
        error => {
          this.user = undefined
        }
      )
    }
  }

  ngOnInit(): void {
    this.socket.on('newCart', (data:any)=>{
      this.getCart_client()
    })

    this.socket.on('add_newCart', (data:any)=>{
      this.getCart_client()
    })
    
  }

  getCart_client(){
    this._clientService.getCart_client(this.user_lc._id, this.token).subscribe(
      response => {
        this.cartMod = response.data
        this.subtotal = 0
        this.calcCart()
      }
    )
  }

  logout(){
    window.location.reload()
    localStorage.clear()
    this._router.navigate(['/'])
  }

  search_product(){
    this._clientService.listProducts_filterPublic(this.filter_product).subscribe(
      response => {
        this.products = response.data
      }
    )
  }

  op_modalCart(){
    if(!this.op_cart){
      this.op_cart = true
      $('#cart').addClass('show')
    }else{
      this.op_cart = false
      $('#cart').removeClass('show')
    }
  }

  calcCart(){
    this.cartMod.forEach(element => {
      this.subtotal = this.subtotal + parseInt(element.product.price)
    })
  }

  deleteItem(id:any){
    this._clientService.deleteCart_client(id, this.token).subscribe(
      response => {
        iziToast.error({
          title: 'ERROR',
          timeout: 3000,
          position: 'topRight',
          message: `Se elimino el producto del carrito`,
          progressBar: false,
          transitionIn: 'bounceInLeft',
          transitionOut: 'fadeOutRight'
          
        })
        this.socket.emit('deleteCart_client', {data: response.data}) 
      }
    )
  }

}
