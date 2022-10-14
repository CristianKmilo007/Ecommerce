const Coupon = require('../models/coupon.model')

const registerCoupon_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){

            let data = req.body

            let reg = await Coupon.create(data)
            res.status(200).send({data:reg})

        }else{
            res.status(500).send({message: 'NoAccess'})
        }
    }else{
        res.status(500).send({message: 'NoAccess'})
    }

}

const listCoupon_filterAdmin = async (req, res) => {
    
    if(req.user){

        if(req.user.role == 'Admin'){

            let type = req.params['type']
            let filter = req.params['filter']
        
            if(type == null || type == 'null'){
                let register = await Coupon.find().sort({createdAt: -1})
                res.status(200).send({data:register})
            }else{
                if(type == 'code'){
                    let register = await Coupon.find({code:new RegExp(filter,'i')})
                    res.status(200).send({data:register})
                }else if(type == 'type'){
                    let register = await Coupon.find({type:new RegExp(filter,'i')})
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

const getCoupon_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){
            
            let id = req.params['id']
            
            try {

                let reg = await Coupon.findById({_id:id})
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

const updateCoupon_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){
            
            let id = req.params['id']
            let data = req.body
            
            let reg = await Coupon.findByIdAndUpdate({_id:id},{
                code : data.code,
                type : data.type,
                value : data.value,
                limit : data.limit
            })
            res.status(200).send({data:reg})
            
        }else{
            res.status(500).send({message: 'NoAccess'})
        }
        
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const deleteCoupon_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){
            
            let id = req.params['id']
                      
            let reg = await Coupon.findByIdAndRemove({_id:id})
            res.status(200).send({data:reg})
            
        }else{
            res.status(500).send({message: 'NoAccess'})
        }
        
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

module.exports = {
    registerCoupon_Admin,
    listCoupon_filterAdmin,
    getCoupon_Admin,
    updateCoupon_Admin,
    deleteCoupon_Admin
}