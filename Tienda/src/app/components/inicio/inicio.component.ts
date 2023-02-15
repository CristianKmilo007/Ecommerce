import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare const tns : any

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public discount_active : any = undefined

  public newProducts : Array <any> = []
  public salesProducts : Array <any> = []

  public URI_DISCOUNT_BACKEND
  public URI_PRODUCT_BACKEND

  constructor(
    private _clientService : ClientService
  ) { 

    this.URI_DISCOUNT_BACKEND = GLOBAL.uriDiscount
    this.URI_PRODUCT_BACKEND = GLOBAL.uriProduct
  }

  ngOnInit(): void {

    this._clientService.getDiscount_Active().subscribe(
      response => {

        if(response.data != undefined){
          this.discount_active = response.data[0]
        }else{
          this.discount_active = undefined
        }
        
      }
    )

    this._clientService.listProducts_newsPublic().subscribe(
      response => {
        this.newProducts = response.data 
      }
    )

    this._clientService.listProducts_mostSelledPublic().subscribe(
      response => {
        this.salesProducts = response.data 
      }
    )

    setTimeout(()=>{
      tns({
        container: '.cs-carousel-inner',
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 7000,
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        mode: 'gallery',
        navContainer: '#pager',
        responsive: {
          0: { controls: false },
          991: { controls: true }
        }
      });

      tns({
        container: '.cs-carousel-inner-two',
        autoplay: true,
        controls: false,
        responsive: {
          0: {
            gutter: 20
          },
          400: {
            items: 2,
            gutter: 20
          },
          520: {
            gutter: 30
          },
          768: {
            items: 6,
            gutter: 30
          }
        }
        
      });

      tns({
        container: '.cs-carousel-inner-three',
        autoplay: true,
        autoplayButtonOutput: false,
        speed: 600,
        controls: false,
        mouseDrag: !0,
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          420: {
            items: 2,
            gutter: 20
          },
          600: {
            items: 3,
            gutter: 20
          },
          700: {
            items: 3,
            gutter: 30
          },
          900: {
            items: 4,
            gutter: 30
          },
          1200: {
            items: 5,
            gutter: 30
          },
          1400: {
            items: 5,
            gutter: 15
          }
        }
        
        
      });

      tns({
        container: '.cs-carousel-inner-four',
        nav: false,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 5000,
        speed: 600,
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        controlsContainer:'#custom-controls-trending',
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

      tns({
        container: '.cs-carousel-inner-five',
        controls: false,
        gutter: 30,
        responsive: {
          0: { items: 1 },
          380: { items: 2 },
          550: { items: 3 },
          750: { items: 4 },
          1000: { items: 5 },
          1250: { items: 7 }
        }
        
      });

      tns({
        container: '.cs-carousel-inner-six',
        controls: false,
        gutter: 15,
        responsive: {
          0: { items: 2 },
          500: { items: 3 },
          1200: { items: 3 }
        }
        
      });

    },500);
  }

}
