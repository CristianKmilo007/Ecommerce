import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';

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

}