import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent implements OnInit {

  public token : any
  public id : any

  public user : any = undefined
  public user_lc : any = {}

  constructor(
    private _clientService : ClientService
  ) { 
    this.token = localStorage.getItem('token')
    this.id = localStorage.getItem('_id')

    if(this.token){
      this._clientService.getClient_Public(this.id, this.token).subscribe(
        response => {
          this.user = response.data
          localStorage.setItem('userData', JSON.stringify(this.user) )
          if(localStorage.getItem('userData')){
            let userData : any = localStorage.getItem('userData')
            this.user_lc = JSON.parse(userData)
          }else{
            this.user_lc = undefined
          }
        },
        error => {
          this.user = undefined
        }
      )
    }
  }

  ngOnInit(): void {
  }

}
