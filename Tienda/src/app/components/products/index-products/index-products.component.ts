import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iif } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { io } from 'socket.io-client'

declare const noUiSlider : any
declare const jQuery:any
declare const $:any
declare const iziToast : any

@Component({
  selector: 'app-index-products',
  templateUrl: './index-products.component.html',
  styleUrls: ['./index-products.component.css']
})
export class IndexProductsComponent implements OnInit {

  public config: any = {}
  public filter_laboratory = ''
  public products : Array <any> = []
  public filter_product = ''
  public filterLab_products = 'todos'

  public load_data = true
  public page = 1
  public pageSize = 45
  public sort_by = 'Defecto'

  public cart_data : any = {
    variety: '',
    stock: 2
  }

  public token : any

  public load_btn = false

  public URI_PRODUCT_BACKEND

  public route_laboratory : any

  public socket = io('http://localhost:5000')

  constructor(
    private _clientService : ClientService,
    private _route : ActivatedRoute
  ) {

    this.token = localStorage.getItem('token')

    this.URI_PRODUCT_BACKEND = GLOBAL.uriProduct
  
    this._clientService.getConfig_Public().subscribe(
      response => {
        this.config = response.data
          this.load_data = false
        
        
      }
    )

    this._route.params.subscribe(
      params => {
        this.route_laboratory = params['laboratory']

        if (this.route_laboratory) {
          this._clientService.listProducts_filterPublic('').subscribe(
            response => {
              this.products = response.data
              this.products = this.products.filter(item => item.laboratory.toLowerCase() == this.route_laboratory)
              this.load_data = false
            }
          )
        } else {
          this._clientService.listProducts_filterPublic('').subscribe(
            response => {
              this.products = response.data
              this.load_data = false
            }
          )
        }
      }
    )

    

  }

  ngOnInit(): void {

    var slider : any = document.getElementById('slider');
    noUiSlider.create(slider, {
        start: [0, 200000],
        connect: true,
        range: {
            'min': 0,
            'max': 200000
        },
        tooltips: [true,true],
        pips: {
          mode: 'count', 
          values: 6,
          
        }
    })

    slider.noUiSlider.on('update', function (values:any) {
        $('.cs-range-slider-value-min').val(values[0]);
        $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size','11px');

  }

  search_laboratory(){
    if(this.filter_laboratory){
      let search = new RegExp(this.filter_laboratory, 'i')
      this.config.laboratories = this.config.laboratories.filter((
        item:any) => search.test(item.laboratory)
      )
    }else{
      this._clientService.getConfig_Public().subscribe(
        response => {
          this.config = response.data
          
        }
      )
    }
  }

  search_product(){
    this._clientService.listProducts_filterPublic(this.filter_product).subscribe(
      response => {
        this.products = response.data
        this.load_data = false
        
      }
    )
  }

  search_prices(){

    this._clientService.listProducts_filterPublic(this.filter_product).subscribe(
      response => {
        this.products = response.data

        let min =  parseInt($('.cs-range-slider-value-min').val())
        let max =  parseInt($('.cs-range-slider-value-max').val())

        this.products = this.products.filter(item=>{
          return item.price >= min && item.price <= max
        })

        this.load_data = false

      }
    )

    
  }

  searchOf_laboratory(){
    if (this.filterLab_products == 'todos') {
      
      
      this._clientService.listProducts_filterPublic(this.filter_product).subscribe(
        response => {
          this.products = response.data
          this.load_data = false
  
        }
      )
    } else {
      this._clientService.listProducts_filterPublic(this.filter_product).subscribe(
        response => {
          this.products = response.data
          this.products = this.products.filter(item => item.laboratory == this.filterLab_products)
          this.load_data = false
        }
      )
      
    }
  }

  resetProducts(){
    this.filter_product = ''
    this._clientService.listProducts_filterPublic('').subscribe(
      response => {
        this.products = response.data
        this.load_data = false
      }
    )
  }

  orderFor(){
    if (this.sort_by == 'Defecto') {
      this._clientService.listProducts_filterPublic('').subscribe(
        response => {
          this.products = response.data
          this.load_data = false
        }
      )
    } else if(this.sort_by == 'Popularidad'){
      this.products.sort((a,b)=>{
        if(a.sales < b.sales){
          return 1
        }
        if(a.sales > b.sales){
          return -1
        }
        return 0
      })
    } else if(this.sort_by == 'Max_min'){
      this.products.sort((a,b)=>{
        if(a.price < b.price){
          return 1
        }
        if(a.price > b.price){
          return -1
        }
        return 0
      })
    } else if(this.sort_by == 'Min_max'){
      this.products.sort((a,b)=>{
        if(a.price > b.price){
          return 1
        }
        if(a.price < b.price){
          return -1
        }
        return 0
      })
    } else if(this.sort_by == 'A_Z'){
      this.products.sort((a,b)=>{
        if(a.title > b.title){
          return 1
        }
        if(a.title < b.title){
          return -1
        }
        return 0
      })
    } else if(this.sort_by == 'Z_A'){
      this.products.sort((a,b)=>{
        if(a.title < b.title){
          return 1
        }
        if(a.title > b.title){
          return -1
        }
        return 0
      })
    }
  }

  addProduct(product:any){
    if (this.cart_data.stock <= product.stock) {
      let data = {
        product : product._id,
        client : localStorage.getItem('_id'),
        stock: 1,
        variety: product.varieties[0].titleVariety
      }
      
      this.load_btn = true
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
        message: `Solo hay ${product.stock} unidades en stock`,
        progressBar: false,
        transitionIn: 'bounceInLeft',
        transitionOut: 'fadeOutRight'
        
      })
    }
  }

}
