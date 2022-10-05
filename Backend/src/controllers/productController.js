const Product = require('../models/product.model')
const fs = require('fs')
const path = require('path')

const registerProduct_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){

            let data = req.body
            let imgPath = req.files.image.path
            let name = imgPath.split('\\')
            let nameImg = name[3]

            data.slug = data.title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')
            data.image = nameImg
            let reg = await Product.create(data)

            res.status(200).send({data:reg})

        }else{
            res.status(500).send({message: 'NoAccess'})
        }
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const listProducts_filterAdmin = async (req, res) => {

    if(req.user){

        if(req.user.role){

            let type = req.params['type']
            let filter = req.params['filter']

            if(type == null || type == 'null'){
                let register = await Product.find()
                res.status(200).send({data:register})
            }else{
                if(type == 'title'){
                    let register = await Product.find({title: new RegExp(filter, 'i')})
                    res.status(200).send({data:register})
                }else if(type == 'laboratory'){
                    let register = await Product.find({laboratory: new RegExp(filter, 'i')})
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

const deleteProduct_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){
            
            let id = req.params['id']
                      
            let reg = await Product.findByIdAndRemove({_id:id})
            res.status(200).send({data:reg})
            
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
    fs.stat('./src/uploads/products/'+img, (err)=>{
       if(!err){
        let path_img = './src/uploads/products/'+img
        res.status(200).sendFile(path.resolve(path_img))
       }else{
        let path_img = './src/uploads/default.jpg'
        res.status(200).sendFile(path.resolve(path_img))
       }
    })
}

module.exports = {
    registerProduct_Admin,
    listProducts_filterAdmin,
    deleteProduct_Admin,
    getFrontPage
}
