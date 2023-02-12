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
  public discount_active : any = undefined

  public subtotal = 0
  public totalPag = 0
  public price_shipping = 0

  public URI_PRODUCT_BACKEND : any

  public socket = io('http://localhost:5000')

  public sale : any = {}
  public dsale : Array <any> = []

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

    this.sale.client = this.idClient
    
  }

  ngOnInit(): void {

    this.initData()

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
      onApprove : async (data:any,actions:any)=>{
        const order = await actions.order.capture();
        
        this.sale.transaction = order.purchase_units[0].payments.captures[0].id
        
        this.sale.details = this.dsale
        this._clientService.registerBuy_client(this.sale, this.token).subscribe(
          response => {
            console.log(response);
            
          }
        )
        
      },
      onError : (err:any) =>{
       
      },
      onCancel: function (data:any,actions:any) {
        
      }
    }).render(this.paypalElement.nativeElement);

    this._clientService.getDiscount_Active().subscribe(
      response => {

        if(response.data != undefined){
          this.discount_active = response.data[0]
          console.log(this.discount_active);
        }else{
          this.discount_active = undefined
        }
        
      }
    )
  }

  initData(){
    this._clientService.getCart_client(this.idClient, this.token).subscribe(
      response => {
        this.cartMod = response.data
        this.subtotal = 0

        this.cartMod.forEach(element => {
          this.dsale.push({
            product: element.product._id,
            subtotal: element.product.price,
            variety: element.variety,
            stock: element.stock,
            client: this.idClient
          })
        })

        this.calcCart()
        this.calc_total('A drogueria')
      }
    )
  }

  calcCart(){
    this.subtotal = 0
    if(this.discount_active == undefined){
      this.cartMod.forEach(element => {
        this.subtotal = this.subtotal + parseInt(element.product.price)
      })
    }else if(this.discount_active != undefined){
      this.cartMod.forEach(element => {
        let newPrice = Math.round(parseInt(element.product.price) - (parseInt(element.product.price) * this.discount_active.discount) / 100)
        this.subtotal = this.subtotal + newPrice
      })
    }
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
          this.sale.address = this.direccion_principal._id
        }
        
      }
    )
  }

  calc_total(title_shipping:any){
    this.totalPag = this.subtotal + this.price_shipping

    this.sale.subtotal = this.totalPag
    this.sale.shippingPrice = this.price_shipping
    this.sale.shippingTitle = title_shipping
    console.log(this.sale);
  }

}
