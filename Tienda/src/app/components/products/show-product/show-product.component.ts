import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from 'socket.io-client'

declare const iziToast : any
declare const tns : any
declare const lightGallery : any

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  public slug: any
  public product : any = {}
  public product_rec : Array<any> = []
  public cart_data : any = {
    variety: '',
    stock: 1
  }
  public discount_active : any = undefined

  public token : any

  public URI_PRODUCT_BACKEND

  public load_btn = false

  public socket = io('http://localhost:5000')

  constructor(
    private _route : ActivatedRoute,
    private _clientService : ClientService
  ) { 
    this.token = localStorage.getItem('token')
    this.URI_PRODUCT_BACKEND = GLOBAL.uriProduct
    this._route.params.subscribe(
      params => {
        this.slug = params['slug']

        this._clientService.getProducts_slugPublic(this.slug).subscribe(
          response => {
            this.product = response.data
            this._clientService.listProducts_recomendedPublic(this.product.laboratory).subscribe(
              response => {
                this.product_rec = response.data
                
              }
            )
          }
        )
      }
    )
  }

  ngOnInit(): void {

    setTimeout(()=>{
      tns({
        container: '.cs-carousel-inner',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        navContainer: "#cs-thumbnails",
        navAsThumbnails: true,
        gutter: 15,
      });

      var e = document.querySelectorAll(".cs-gallery");
      if (e.length){
        for (var t = 0; t < e.length; t++){
          lightGallery(e[t], { selector: ".cs-gallery-item", download: !1, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0 } });
        }
      }

      tns({
        container: '.cs-carousel-inner-two',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplay: true,
        autoplayButtonOutput: false,
        nav: false,
        controlsContainer: "#custom-controls-related",
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          480: {
            items: 2,
            gutter: 24
          },
          700: {
            items: 3,
            gutter: 24
          },
          1100: {
            items: 5,
            gutter: 30
          }
        }
      });
    }, 500)

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

  addProduct(){
    if(this.cart_data.variety){
      if (this.cart_data.stock <= this.product.stock) {
        let data = {
          product : this.product._id,
          client : localStorage.getItem('_id'),
          stock: this.cart_data.stock,
          variety: this.cart_data.variety
        }
        
        this.load_btn = true
        console.log(data);
        
        this._clientService.addCart_client(data, this.token).subscribe(
          response => {
            if (response.data == undefined) {
              iziToast.error({
                title: 'ERROR',
                timeout: 3000,
                position: 'topRight',
                message: `El producto ya existe en el carrito`,
                progressBar: false,
                transitionIn: 'bounceInLeft',
                transitionOut: 'fadeOutRight'
                
              })
              this.load_btn = false
            } else {
              iziToast.success({
                title: 'OK',
                timeout: 3000,
                position: 'topRight',
                message: 'Se agrego el producto al carrito',
                progressBar: false,
                transitionIn: 'bounceInLeft',
                transitionOut: 'fadeOutRight'
              })
              this.socket.emit('addCart_client', {data:true})
              this.load_btn = false
            }
          },
          error => {

          }
            
        )
        
      }else{
        iziToast.error({
          title: 'ERROR',
          timeout: 3000,
          position: 'topRight',
          message: `Solo hay ${this.product.stock} unidades en stock`,
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
        message: 'Seleccione la presentacion del producto',
        progressBar: false,
        transitionIn: 'bounceInLeft',
        transitionOut: 'fadeOutRight'
        
      })
    }
  }


}
