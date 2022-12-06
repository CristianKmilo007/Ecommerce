import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from 'socket.io-client'

declare const iziToast : any
declare const Cleave : any
declare const StickySidebar : any


declare const paypal : any

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
} 

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @ViewChild('paypalButton',{static:true}) 
  public paypalElement : any;

  public idClient : any
  public token : any

  public cartMod : Array <any> = []
  public direccion_principal : any = {}
  public shipping : Array <any> = []

  public subtotal = 0
  public totalPag = 0
  public price_shipping = 0

  public URI_PRODUCT_BACKEND : any

  public socket = io('http://localhost:5000')

  constructor(
    private _clientService : ClientService
  ) { 
    this.idClient = localStorage.getItem('_id')
    this.token = localStorage.getItem('token')
    this.URI_PRODUCT_BACKEND = GLOBAL.uriProduct

    this._clientService.getshipping().subscribe(
      response => {
        this.shipping = response
      }
    )

    this._clientService.getCart_client(this.idClient, this.token).subscribe(
      response => {
        this.cartMod = response.data
        this.subtotal = 0
        this.calcCart()
      }
    )
  }

  ngOnInit(): void {
    setTimeout(() => {
      new Cleave('#cc-number', {
        creditCard: true,
        onCreditCardTypeChanged: function (type:any) {

        }
      })

      new Cleave('#cc-exp-date', {
        date: true,
        datePattern: ['m', 'y']
      })

      const sidebar = new StickySidebar('.sidebar-sticky', {topSpacing: 20})
    });

    this.getMain_address()

    paypal.Buttons({
      style: {
          layout: 'horizontal'
      },
      createOrder: (data:any,actions:any)=>{
  
          return actions.order.create({
            purchase_units : [{
              description : 'Nombre del pago',
              amount : {
                currency_code : 'USD',
                value: 999
              },
            }]
          });
        
      },
      onApprove : async (ddata:any,actions:any)=>{
        const order = await actions.order.capture();
  
        
      },
      onError : (err:any) =>{
       
      },
      onCancel: function (data:any,actions:any) {
        
      }
    }).render(this.paypalElement.nativeElement);
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
            this.subtotal = 0
            this.calcCart()
          }
        )
      }
    )
  }

  getMain_address(){
    this._clientService.getMain_addressClient(this.idClient, this.token).subscribe(
      response => {
        if (response.data == undefined) {
          this.direccion_principal = undefined
        } else {
          this.direccion_principal = response.data
        }
        
      }
    )
  }

  calc_total(){
    this.totalPag = this.subtotal + this.price_shipping
  }

}
