import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { ClientService } from 'src/app/services/client.service';

declare const iziToast: any

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  public client : any = {}
  public id : any
  public token : any

  constructor(
    private _route : ActivatedRoute,
    private _clientService : ClientService,
    private _adminService : AdminService,
    private _router : Router
    
  ) { 
    this.token = this._adminService.getToken()
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params =>{
        this.id = params['id']
        this._clientService.getClient_Admin(this.id, this.token).subscribe(
          response => {
            console.log(response)
            if(response.data == undefined){
              this.client = response.undefined
            }else{
              this.client = response.data
            }
          },
          error => {
            console.log(error)
          }
        )
      }
    )
  }

  update(updateForm:any){
    if(updateForm.valid){
      this._clientService.updateClient_Admin(this.id, this.client, this.token).subscribe(
        response => {
          iziToast.success({
            title: 'OK',
            timeout: 3000,
            position: 'topRight',
            message: 'Cliente actualizado correctamente',
            progressBar: false,
            transitionIn: 'bounceInLeft',
            transitionOut: 'fadeOutRight'
          })

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
