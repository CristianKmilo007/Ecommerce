import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-index-client',
  templateUrl: './index-client.component.html',
  styleUrls: ['./index-client.component.css']
})
export class IndexClientComponent implements OnInit {

  public clients : Array<any> = []

  constructor(
    private _clientService : ClientService
  ) { }

  ngOnInit(): void {
    this._clientService.listClient_filterAdmin().subscribe(
      (response:any)=>{
        
        this.clients = response.data
        
      },
      (error)=>{
        console.log(error)
      }
    )
  }

}