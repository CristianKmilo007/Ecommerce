import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare const jQuery:any
declare const $:any
declare const iziToast:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {}
  public usuario: any = {}
  public token: any = ''



  constructor(

    private _adminService: AdminService,
    private _router: Router

  ) {

    this.token = this._adminService.getToken()

  }

  ngOnInit(): void {

    if(this.token){
      this._router.navigate(['/'])
    }

  }

  login(loginForm: NgForm){
    if(loginForm.valid){

      console.log(this.user)

      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._adminService.loginAdmin(data).subscribe(
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
          console.log(error)
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
