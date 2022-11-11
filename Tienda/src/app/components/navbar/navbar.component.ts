import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public token:any
  public id:any
  public user : any = undefined
  public user_lc : any = undefined
  public config: any = {}

  public products : Array <any> = []
  public filter_product = ''

  constructor(
    private _clientService : ClientService,
    private _router : Router
  ) {
    this.token = localStorage.getItem('token')
    this.id = localStorage.getItem('_id')

    this._clientService.getConfig_Public().subscribe(
      response => {
        this.config = response.data
        
      },
      error => {
        console.log(error);
        
      }
    )

    this._clientService.listProducts_filterPublic(this.filter_product).subscribe(
      response => {
        this.products = response.data
      }
    )

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

  logout(){
    window.location.reload()
    localStorage.clear()
    this._router.navigate(['/'])
  }

  search_product(){
    this._clientService.listProducts_filterPublic(this.filter_product).subscribe(
      response => {
        this.products = response.data
      }
    )
  }

}
