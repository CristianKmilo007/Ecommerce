const Discount = require('../models/discount.model')
const fs = require('fs')
const path = require('path')

const registerDiscount_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){

            let data = req.body

            let imgPath = req.files.banner.path
            let name = imgPath.split('\\')
            let nameImg = name[3]

            data.banner = nameImg
            let reg = await Discount.create(data)

            res.status(200).send({data:reg})

        }else{
            res.status(500).send({message: 'NoAccess'})
        }
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const listDiscount_Admin = async (req, res) => {

    if(req.user){

        if(req.user.role){

            let filter = req.params['filter']
 
            let register = await Discount.find({title: new RegExp(filter, 'i')}).sort({createdAt: -1})
            res.status(200).send({data:register})

        }else{
            res.status(500).send({message: 'NoAccess'})
        }

    }else{
        res.status(500).send({message: 'NoAccess'})
    }

}

const getBanner_discount = async (req, res)=>{
    let img = req.params['img']
    console.log(img);
    fs.stat('./src/uploads/discounts/'+img, (err)=>{
       if(!err){
        let path_img = './src/uploads/discounts/'+img
        res.status(200).sendFile(path.resolve(path_img))
       }else{
        let path_img = './src/uploads/default.jpg'
        res.status(200).sendFile(path.resolve(path_img))
       }
    })
}

const getDiscount_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){
            
            let id = req.params['id']
            
            try {

                let reg = await Discount.findById({_id:id})
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

const updateDiscount_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){

            let id = req.params['id']
            let data = req.body

            if(req.files){
                let imgPath = req.files.banner.path
                let name = imgPath.split('\\')
                let nameImg = name[3]

                let reg = await Discount.findByIdAndUpdate({_id:id}, {
                    title: data.title,
                    discount: data.discount,
                    dateInit: data.dateInit,
                    dateFinish: data.dateFinish,
                    banner: nameImg
                })

                fs.stat('./src/uploads/discounts/'+reg.banner, (err)=>{
                    if(!err){
                        fs.unlink('./src/uploads/discounts/'+reg.banner, (err)=>{
                            if(err) throw err
                        })
                    }
                })

                res.status(200).send({data:reg})

            }else{
                let reg = await Discount.findByIdAndUpdate({_id:id}, {
                    title: data.title,
                    discount: data.discount,
                    dateInit: data.dateInit,
                    dateFinish: data.dateFinish
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

const deleteDiscount_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){
            
            let id = req.params['id']
                      
            let reg = await Discount.findByIdAndRemove({_id:id})

            fs.stat('./src/uploads/discounts/'+reg.banner, (err)=>{
                if(!err){
                    fs.unlink('./src/uploads/discounts/'+reg.banner, (err)=>{
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

const getDiscount_Active = async (req,res) => {

    let discounts = await Discount.find().sort({createdAt: -1})
    let arr_discounts = []

    let today = Date.parse(new Date().toString())/1000
    
    discounts.forEach(element => {
        let tt_init = Date.parse(element.dateInit+'T00:00:00')/1000
        let tt_finish = Date.parse(element.dateFinish+'T23:59:59')/1000

        if(today >= tt_init && today <= tt_finish){
            arr_discounts.push(element)
        }   
    })

    if(arr_discounts.length >= 1){
        res.status(200).send({data: arr_discounts})
    }else{
        res.status(200).send({data: undefined})
    }
}

module.exports = {
    registerDiscount_Admin,
    listDiscount_Admin,
    getBanner_discount,
    getDiscount_Admin,
    updateDiscount_Admin,
    deleteDiscount_Admin,
    getDiscount_Active
}