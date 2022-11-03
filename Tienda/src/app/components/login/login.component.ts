import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

declare const iziToast:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:any = {}
  public usuario: any = {}
  public token:any

  constructor(
    private _clientService : ClientService,
    private _router : Router
  ) {
    this.token = localStorage.getItem('token')
    if(this.token){
      this._router.navigate(['/'])
    }
   }

  ngOnInit(): void {
  }

  login(loginForm:any){
    if(loginForm.valid){

      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._clientService.loginClient(data).subscribe(
        response => {
          if(response.data == undefined){
            iziToast.error({
              title: 'ERROR',
              timeout: 3000,
              position: 'topRight',
              message: response.message,
              progressBar: false,
              transitionIn: 'bounceInLeft',
              transitionOut: 'fadeOutRight'    
            })
          }else{
            this.usuario = response.data
            localStorage.setItem('token', response.token)
            localStorage.setItem('_id', response.data._id)

            this._router.navigate(['/'])
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
        message: 'Los datos del formulario no son validos',
        progressBar: false,
        transitionIn: 'bounceInLeft',
        transitionOut: 'fadeOutRight'
        
      })
    }
  }

}
