const Config = require('../models/config.model')
const fs = require('fs')
const path = require('path')

const getConfig_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){

            let reg = await Config.findById({_id:'6345fa12303ba17146f27757' })
            res.status(200).send({data:reg})
            
        }else{
            res.status(500).send({message: 'NoAccess'})
        }
        
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const updateConfig_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){

           let data = req.body
           
           if(req.files){

                let imgPath = req.files.logo.path
                let name = imgPath.split('\\')
                let nameLogo = name[3]

                let reg = await Config.findByIdAndUpdate({_id:'6345fa12303ba17146f27757'},{
                    laboratories: JSON.parse(data.laboratories),
                    nameBusiness: data.nameBusiness,
                    logo: nameLogo,
                    serie: data.serie,
                    correlative: data.correlative
                })

                fs.stat('./src/uploads/configurations/'+reg.logo, (err)=>{
                    if(!err){
                        fs.unlink('./src/uploads/configurations/'+reg.logo, (err)=>{
                            if(err) throw err
                        })
                    }
                })

                res.status(200).send({data:reg})

           }else{
                let reg = await Config.findByIdAndUpdate({_id:'6345fa12303ba17146f27757'},{
                    laboratories: data.laboratories,
                    nameBusiness: data.nameBusiness,       
                    serie: data.serie,
                    correlative: data.correlative
                })

                res.status(200).send({data:reg})
           }
           
           
            
        }else{
            res.status(500).send({message: 'NoAccess'})
        }
        
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const getFrontPage = async (req, res)=>{
    let img = req.params['img']
    console.log(img);
    fs.stat('./src/uploads/configurations/'+img, (err)=>{
       if(!err){
        let path_img = './src/uploads/configurations/'+img
        res.status(200).sendFile(path.resolve(path_img))
       }else{
        let path_img = './src/uploads/default.jpg'
        res.status(200).sendFile(path.resolve(path_img))
       }
    })
}


const getConfig_Public = async (req, res) => {

    let reg = await Config.findById({_id:'6345fa12303ba17146f27757' })
    res.status(200).send({data:reg})

}

const deleteLaboratories_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){
            
            let id = req.params['id']
                      
            let reg = await Config.laboratories.findByIdAndRemove({_id:id})
            res.status(200).send({data:reg})
            
            
        }else{
            res.status(500).send({message: 'NoAccess'})
        }
        
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

module.exports = {
    updateConfig_Admin,
    getConfig_Admin,
    getFrontPage,
    getConfig_Public,
    deleteLaboratories_Admin
}
