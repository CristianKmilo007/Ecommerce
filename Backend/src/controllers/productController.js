const Product = require('../models/product.model')
const Inventory = require('../models/inventory.model')
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

            let inventory = await Inventory.create({
                admin: req.user.sub,
                stock: data.stock,
                supplier: 'Primer registro',
                product: reg._id
            })

            res.status(200).send({data:reg, inventory:inventory})

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
                }else if(type == 'laboratory' && type == 'title'){
                    let register = await Product.find({laboratory: new RegExp(filter, 'i'), title: new RegExp(filter, 'i')})
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

            fs.stat('./src/uploads/products/'+reg.image, (err)=>{
                if(!err){
                    fs.unlink('./src/uploads/products/'+reg.image, (err)=>{
                        if(err) throw err
                    })
                }
            })
            
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

const getProduct_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){
            
            let id = req.params['id']
            
            try {

                let reg = await Product.findById({_id:id})
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

const updateProduct_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){

            let id = req.params['id']
            let data = req.body

            if(req.files){
                let imgPath = req.files.image.path
                let name = imgPath.split('\\')
                let nameImg = name[3]

                let reg = await Product.findByIdAndUpdate({_id:id}, {
                    title: data.title,
                    stock: data.stock,
                    price: data.price,
                    laboratory: data.laboratory,
                    description: data.description,
                    image: nameImg
                })

                fs.stat('./src/uploads/products/'+reg.image, (err)=>{
                    if(!err){
                        fs.unlink('./src/uploads/products/'+reg.image, (err)=>{
                            if(err) throw err
                        })
                    }
                })

                res.status(200).send({data:reg})

            }else{
                let reg = await Product.findByIdAndUpdate({_id:id}, {
                    title: data.title,
                    stock: data.stock,
                    price: data.price,
                    laboratory: data.laboratory,
                    description: data.description
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

const listInventory_productAdmin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){

            let id = req.params['id']
            let reg = await Inventory.find({product: id}).populate('admin').sort({createdAt: -1})

            res.status(200).send({data:reg})

        }else{
            res.status(500).send({message: 'NoAccess'})
        }
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const deleteInventory_productAdmin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){

            let id = req.params['id']
            
            let reg = await Inventory.findByIdAndRemove({_id:id})
            let product = await Product.findById({_id:reg.product})
            let newStock = parseInt(product.stock) - parseInt(reg.stock)
            let productUp = await Product.findByIdAndUpdate({_id:reg.product},{
                stock: newStock
            })

            res.status(200).send({data:productUp})

        }else{
            res.status(500).send({message: 'NoAccess'})
        }
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const registerInventory_productAdmin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){

            let data = req.body

            let reg = await Inventory.create(data)
            let product = await Product.findById({_id:reg.product})
            let newStock = parseInt(product.stock) + parseInt(reg.stock)
            let productUp = await Product.findByIdAndUpdate({_id:reg.product},{
                stock: newStock
            })

            res.status(200).send({data:productUp})

        }else{
            res.status(500).send({message: 'NoAccess'})
        }
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const updateVariety_productAdmin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){

            let id = req.params['id']
            let data = req.body

            let reg = await Product.findByIdAndUpdate({_id:id}, {
                varieties: data.varieties,
                titleVariety: data.titleVariety,
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
    registerProduct_Admin,
    listProducts_filterAdmin,
    deleteProduct_Admin,
    getFrontPage,
    getProduct_Admin,
    updateProduct_Admin,
    listInventory_productAdmin,
    deleteInventory_productAdmin,
    registerInventory_productAdmin,
    updateVariety_productAdmin
}
