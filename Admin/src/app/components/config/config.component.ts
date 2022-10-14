import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { v4 as uuidv4 } from "uuid";

declare const iziToast: any
declare const jQuery:any
declare const $:any

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public token:any
  public config : any = {}

  public load_btn = false

  public nameLab = ''
  public file:any = undefined
  public imgSelect : any | ArrayBuffer

  public URI_CONFIG_BACKEND

  constructor(
    private _adminService : AdminService
  ) {
    this.token = this._adminService.getToken() 
    this._adminService.getConfig_Admin(this.token).subscribe(
      response => {
        this.config = response.data
        this.imgSelect = `${this.URI_CONFIG_BACKEND}/getFrontPage/${this.config.logo}`
        
      },
      error => {
        console.log(error);
        
      }
    )
    this.URI_CONFIG_BACKEND = GLOBAL.uriConfig
  }

  ngOnInit(): void {
  }

  add_nameLab(){
    if(this.nameLab){

      this.config.laboratories.push({
        laboratory: this.nameLab,
        _id: uuidv4()
      })

      this.nameLab = ''
    }else{
      iziToast.error({
        title: 'ERROR',
        timeout: 3000,
        position: 'topRight',
        message: 'Debe ingresar el nombre del laboratorio',
        progressBar: false,
        transitionIn: 'bounceInLeft',
        transitionOut: 'fadeOutRight'
      })
    }
  }

  update(configForm: any){
    if(configForm.valid){
      let data = {
        nameBusiness: configForm.value.nameBusiness,
        serie: configForm.value.serie,
        correlative: configForm.value.correlative,
        laboratories: this.config.laboratories,
        logo: this.file
      }

      console.log(data);
      
      this._adminService.updateConfig_Admin('6345fa12303ba17146f27757', data, this.token).subscribe(
        response =>{
          iziToast.success({
            title: 'OK',
            timeout: 3000,
            position: 'topRight',
            message: 'Se actualizo correctamente la configuracion',
            progressBar: false,
            transitionIn: 'bounceInLeft',
            transitionOut: 'fadeOutRight'
          })
          
        },
        error=>{

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

  fileChangeEvent(event:any):void{

    let file : any

    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0]
      
    }else{
      iziToast.error({
        title: 'ERROR',
        timeout: 3000,
        position: 'topRight',
        message: 'Imagen no valida',
        progressBar: false,
        transitionIn: 'bounceInLeft',
        transitionOut: 'fadeOutRight'
      })
    }

    if(file.size <= 4000000){

      if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg'){

        const reader = new FileReader()
        reader.onload = e => this.imgSelect = reader.result
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded')
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload')
        reader.readAsDataURL(file)

        $('#input-frontPage').text(file.name)
        this.file = file

      }else{
        iziToast.error({
          title: 'ERROR',
          timeout: 3000,
          position: 'topRight',
          message: 'Imagen no valida',
          progressBar: false,
          transitionIn: 'bounceInLeft',
          transitionOut: 'fadeOutRight'
        })
        $('#input-frontPage').text('Seleccionar imagen')
        this.imgSelect = '../../../../assets/img/default.jpg'
        this.file = undefined
      }

      }else{
        iziToast.error({
          title: 'ERROR',
          timeout: 3000,
          position: 'topRight',
          message: 'La imagen supera los 4MB',
          progressBar: false,
          transitionIn: 'bounceInLeft',
          transitionOut: 'fadeOutRight'
        })
        $('#input-frontPage').text('Seleccionar imagen')
        this.imgSelect = '../../../../assets/img/default.jpg'
        this.file = undefined
      }

  }

  ngDoCheck():void{
    $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">")
  }

  delete(idx:any){
    this.load_btn = true
    this.config.laboratories.splice(idx, 1)
    
    

    $('#delete-'+idx).modal('hide')  //Ocultar modal
    $('.modal-backdrop').removeClass('show') //Ocultar modal

    this.load_btn = false
  }

}
