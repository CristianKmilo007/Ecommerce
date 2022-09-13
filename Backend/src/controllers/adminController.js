const Admin = require('../models/admin.model')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../helpers/jwt')

const registerAdmin = async (req, res) => {

    const data = req.body
    let admins_arr = []

    admins_arr = await Admin.find({email:data.email})
    
    if(admins_arr.length == 0){
        if(data.password){
            bcrypt.hash(data.password, null, null, async (err, hash) => {
                if(hash){
                    data.password = hash
                    const register = await Admin.create(data)
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

const loginAdmin = async (req, res) => {
    const data = req.body
    let admin_arr = []

    admin_arr = await Admin.find({email: data.email})

    if(admin_arr.length == 0){
        res.status(200).send({message: 'El ususario no existe', data: undefined})
    }else{
        let user = admin_arr[0]

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

module.exports = {
    registerAdmin,
    loginAdmin
}
