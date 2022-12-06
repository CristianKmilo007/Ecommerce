import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

declare const jQuery:any
declare const $:any
declare const iziToast:any

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  public token:any
  public id:any

  public address:any = {
    country : '',
    state: '',
    city: '',
    main: false
  }

  public getAddress_arr : Array<any> = []

  public getDep_cities : Array<any> = []
  public get_cities : Array<any> = []
  public getDepname : Array<any> = []

  public load_data = true



  constructor(
    private _clientService : ClientService
  ) { 
    this.token = localStorage.getItem('token')
    this.id = localStorage.getItem('_id')

    this._clientService.getDep_cities().subscribe(
      response => {
        this.getDepname = response
      }
    )
    
  }

  ngOnInit(): void {
    this.getAddress()
  }

  getAddress(){
    this._clientService.getAddress_Client(this.id, this.token).subscribe(
      response => {
        this.getAddress_arr = response.data
        this.load_data = false
      }
    )
  }

  select_pais(){
    if (this.address.country == 'Colombia') {
      $('#sl-state').prop('disabled', false)
      this._clientService.getDep_cities().subscribe(
        response => {
          response.forEach((element: {id:any, departamento: any; }) => {
            this.getDep_cities.push({
              id: element.id,
              state: element.departamento
            })
          });      
        }
      )
    }
  }

  select_state(){
    this.get_cities = []
    $('#sl-city').prop('disabled', false)
    this.address.city = ''
    this._clientService.getDep_cities().subscribe(
      response => {
        
        response.forEach((element:{id:any, ciudades:any}) => {
          if(element.id == this.address.state){
            element.ciudades.forEach((element: any) => {
              this.get_cities.push(element)
            })
            
          }
        });
      }
    )
  }

  register(registerForm:any){
    if (registerForm.valid) {

      this.getDepname.forEach((element:any)=>{
        if(element.id == this.address.state){
          this.address.state = element.departamento
        }
      })

      let data = {
        addressee: this.address.addressee,
        identification: this.address.identification,
        phone: this.address.phone,
        zip: this.address.zip,
        address: this.address.address,
        country: this.address.country,
        state: this.address.state,
        city: this.address.city,
        main: this.address.main,
        client: localStorage.getItem('_id')
      }

      this._clientService.registerAddress_Client(data, this.token).subscribe(
        response => {
          this.address = {
            country : '',
            state: '',
            city: '',
            main: false
          }

          $('#sl-state').prop('disabled', true)
          $('#sl-city').prop('disabled', true)

          this.getAddress()
          

          iziToast.success({
            title: 'OK',
            timeout: 3000,
            position: 'topRight',
            message: 'Direccion registrada correctamente',
            progressBar: false,
            transitionIn: 'bounceInLeft',
            transitionOut: 'fadeOutRight'
          })
        }
      )
      
    } else {
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

  changeMain(id:any){
    this._clientService.changeMain_addressClient(id, this.id, this.token).subscribe(
      response => {
        iziToast.success({
          title: 'OK',
          timeout: 3000,
          position: 'topRight',
          message: 'Direccion principal actualizada correctamente',
          progressBar: false,
          transitionIn: 'bounceInLeft',
          transitionOut: 'fadeOutRight'
        })
        this.getAddress()
      }
    )
  }

}
