import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';

declare const iziToast: any
declare const jQuery:any
declare const $:any

@Component({
  selector: 'app-index-client',
  templateUrl: './index-client.component.html',
  styleUrls: ['./index-client.component.css']
})
export class IndexClientComponent implements OnInit {

  public clients : Array<any> = []

  public filterIdentification = ''
  public filterNames = ''
  public filterLastnames = ''
  public filterEstablishment = ''

  public page = 1
  public pageSize = 25

  public token : any 

  public load_data = true
  public load_btn = false

  constructor(
    private _clientService : ClientService,
    private _adminService : AdminService
    
  ) { 
    this.token = this._adminService.getToken()
  }

  ngOnInit(): void {
    this.initData()
  }

  initData(){
    this._clientService.listClient_filterAdmin(null, null, this.token).subscribe(
      (response:any)=>{
        
        this.clients = response.data
        this.load_data = false
        
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  filter(type:any){

    if(type == 'identification'){
      this._clientService.listClient_filterAdmin(type, this.filterIdentification, this.token).subscribe(
        (response:any)=>{
          
          this.clients = response.data
        },
        (error)=>{
          console.log(error)
        }
      )
    }else if(type == 'names'){
      this._clientService.listClient_filterAdmin(type, this.filterNames, this.token).subscribe(
        (response:any)=>{
          
          this.clients = response.data
        },
        (error)=>{
          console.log(error)
        }
      )
    }else if(type == 'lastnames'){
      this._clientService.listClient_filterAdmin(type, this.filterLastnames, this.token).subscribe(
        (response:any)=>{
          
          this.clients = response.data
          
        },
        (error)=>{
          console.log(error)
        }
      )
    }else if(type == 'establishment'){
      this._clientService.listClient_filterAdmin(type, this.filterEstablishment, this.token).subscribe(
        (response:any)=>{
          
          this.clients = response.data
          
        },
        (error)=>{
          console.log(error)
        }
      )
    }

  }

  delete(id:any){
    this.load_btn = true
    this._clientService.deleteClient_Admin(id, this.token).subscribe(
      response => {
        iziToast.success({
          title: 'OK',
          timeout: 3000,
          position: 'topRight',
          message: 'Se elimino correctamente el cliente',
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

}