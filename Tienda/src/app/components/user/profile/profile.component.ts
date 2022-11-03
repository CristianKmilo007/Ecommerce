import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

declare const iziToast:any
declare const jQuery:any
declare const $:any

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user : any = {}
  public id : any
  public token : any

  constructor(
    private _clientService : ClientService
  ) {
    this.id = localStorage.getItem('_id')
    this.token = localStorage.getItem('token')

    if(this.id){
      this._clientService.getClient_Public(this.id, this.token).subscribe(
        response => {
          this.user = response.data
        },
        error => {

        }
      )
    }
  }

  ngOnInit(): void {
  }

  update(updateForm:any){
    if(updateForm.valid){
      this.user.password = $('#input_password').val()
      this._clientService.updateProfile_clientPublic(this.id, this.user, this.token).subscribe(
        response => {
          iziToast.success({
            title: 'OK',
            timeout: 3000,
            position: 'topRight',
            message: 'Perfil actualizado correctamente',
            progressBar: false,
            transitionIn: 'bounceInLeft',
            transitionOut: 'fadeOutRight'
          })
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
