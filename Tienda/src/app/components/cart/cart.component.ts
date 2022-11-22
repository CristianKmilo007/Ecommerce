import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from 'socket.io-client'

declare const iziToast : any

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public idClient : any
  public token : any

  public cartMod : Array <any> = []
  public subtotal = 0
  public totalPag = 0

  public URI_PRODUCT_BACKEND : any

  public socket = io('http://localhost:5000')

  constructor(
    private _clientService : ClientService
  ) { 
    this.idClient = localStorage.getItem('_id')
    this.token = localStorage.getItem('token')
    this.URI_PRODUCT_BACKEND = GLOBAL.uriProduct

    this._clientService.getCart_client(this.idClient, this.token).subscribe(
      response => {
        this.cartMod = response.data
        this.calcCart()
      }
    )
  }

  ngOnInit(): void {
    
  }

  calcCart(){
    this.cartMod.forEach(element => {
      this.subtotal = this.subtotal + parseInt(element.product.price)
    })
    this.totalPag = this.subtotal
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
        this._clientService.getCart_client(this.idClient, this.token).subscribe(
          response => {
            this.cartMod = response.data
            this.calcCart()
          }
        )
      }
    )
  }

}
