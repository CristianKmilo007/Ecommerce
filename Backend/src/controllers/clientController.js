const Client = require('../models/client.model')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../helpers/jwt')

const registerClient = async (req, res) => {

    const data = req.body
    let clients_arr = []

    clients_arr = await Client.find({email:data.email})
    
    if(clients_arr.length == 0){
        if(data.password){
            bcrypt.hash(data.password, null, null, async (err, hash) => {
                if(hash){
                    data.password = hash
                    const register = await Client.create(data)
                    res.status(200).send({data: register})
                }else{
                    res.status(200).send({message: 'ErrorServer', data:undefined})
                }
            })
        }else{
            res.status(200).send({message: 'Se necesita una contraseña', data:undefined})
        }
        
    }else{
        res.status(200).send({message: 'El correo ya fue registrado', data:undefined})
    }
    
}

const loginClient = async (req, res) => {
    const data = req.body
    let client_arr = []

    client_arr = await Client.find({email: data.email})

    if(client_arr.length == 0){
        res.status(200).send({message: 'El ususario no existe', data: undefined})
    }else{
        let user = client_arr[0]

        bcrypt.compare(data.password, user.password, async (error, check) => {
            if(check){
                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                })
            }else{
                res.status(200).send({message: 'Contraseña incorrecta', data: undefined})
            }
        })  
    }
}

const listClient_filterAdmin = async (req, res) => {
    
    if(req.user){

        if(req.user.role == 'Admin'){

            let type = req.params['type']
            let filter = req.params['filter']
        
            if(type == null || type == 'null'){
                let register = await Client.find()
                res.status(200).send({data:register})
            }else{
                if(type == 'names'){
                    let register = await Client.find({names:new RegExp(filter,'i')})
                    res.status(200).send({data:register})
                }else if(type == 'email'){
                    let register = await Client.find({email:new RegExp(filter,'i')})
                    res.status(200).send({data:register})
                }
            }

        }else{
            res.status(500).send({message: 'NoAccess'})
        }
        
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const registerClient_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){
            let data = req.body

            bcrypt.hash('123456789', null, null, async (err, hash) => {
                if(hash){
                    data.password = hash
                    let register = await Client.create(data)
                    res.status(200).send({data: register})
                }else{
                    res.status(200).send({message: 'ErrorServer', data:undefined})
                }
            })

        }else{
            res.status(500).send({message: 'NoAccess'})
        }
        
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const getClient_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){
            
            let id = req.params['id']
            
            try {

                let reg = await Client.findById({_id:id})
                res.status(200).send({data:reg})

            } catch (error) {
                res.status(200).send({data:undefined})
            }
            
        }else{
            res.status(500).send({message: 'NoAccess'})
        }
        
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const updateClient_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){
            
            let id = req.params['id']
            let data = req.body
            
            let reg = await Client.findByIdAndUpdate({_id:id},{
                names : data.names,
                lastnames : data.lastnames,
                identification : data.identification,
                phone : data.phone,
                direction : data.direction,
                city : data.city,
                establishment : data.establishment,
                email : data.email
            })
            res.status(200).send({data:reg})
            
        }else{
            res.status(500).send({message: 'NoAccess'})
        }
        
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}


module.exports = {
   registerClient,
   loginClient,
   listClient_filterAdmin,
   registerClient_Admin,
   getClient_Admin,
   updateClient_Admin
}