import { Component, OnInit } from '@angular/core';
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

  constructor(
    private _clientService : ClientService
  ) { }

  ngOnInit(): void {
    this._clientService.listClient_filterAdmin(null, null).subscribe(
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
      this._clientService.listClient_filterAdmin(type, this.filterNames).subscribe(
        (response:any)=>{
          
          this.clients = response.data
          
        },
        (error)=>{
          console.log(error)
        }
      )
    }else if(type == 'email'){
      this._clientService.listClient_filterAdmin(type, this.filterEmail).subscribe(
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