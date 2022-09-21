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
  public filterNames = ''
  public filterEmail = ''

  public token : any 

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
        
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  filter(type:any){


    if(type == 'names'){
      this._clientService.listClient_filterAdmin(type, this.filterNames, this.token).subscribe(
        (response:any)=>{
          
          this.clients = response.data
          
        },
        (error)=>{
          console.log(error)
        }
      )
    }else if(type == 'email'){
      this._clientService.listClient_filterAdmin(type, this.filterEmail, this.token).subscribe(
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

        $('#delete-'+id).modal('hide')
        $('.modal-backdrop').removeClass('show')

        this.initData()
      },
      error => {
        console.log(error);
        
      }
      
    )
  }

}