import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductService } from 'src/app/services/product.service';
import { Workbook } from "exceljs";

const fs = require('file-saver')


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
  public arr_products : Array<any> = []

  public filterTitle = ''
  public filterLaboratory = ''

  public page = 1
  public pageSize = 25

  public token : any

  public load_data = true
  public load_btn = false

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
        this.products.forEach(element => {
          this.arr_products.push({
            title: element.title,
            stock: element.stock,
            price: element.price,
            laboratory: element.laboratory
          })
        })
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
    this.load_btn = true
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

        this.load_btn = false
        this.initData() //Actualizar tabla
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

  download_excel(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);
    for (let x1 of this.arr_products){
      let x2=Object.keys(x1);

      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    let fname='InventarioDP';

    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30},
      { header: 'Stock', key: 'col2', width: 15},
      { header: 'Precio', key: 'col3', width: 15},
      { header: 'Laboratoio', key: 'col4', width: 25}
    ]as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname.valueOf()+'.xlsx');
    });
  }

}
