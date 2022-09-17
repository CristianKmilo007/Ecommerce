import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';

declare const iziToast: any

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  public client : any = {}
  public token : any

  constructor(
    private _clientService : ClientService,
    private _adminService : AdminService,
    private _router : Router
  ) { 
    this.token = this._adminService.getToken()
  }

  ngOnInit(): void {
  }

  register(registerForm:any){
    if (registerForm.valid){
      console.log(this.client)
      this._clientService.registerClient_Admin(this.client, this.token).subscribe(
        response => {
          iziToast.success({
            title: 'OK',
            timeout: 3000,
            position: 'topRight',
            message: 'Registro de cliente exitoso',
            progressBar: false,
            transitionIn: 'bounceInLeft',
            transitionOut: 'fadeOutRight'
          })

          registerForm.reset()
          this._router.navigate(['/panel/clients'])
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
