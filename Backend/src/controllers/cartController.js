const Cart = require('../models/cart.model')

const addCart_client = async (req, res) => {
    if(req.user){

        let data = req.body

        let cartClient = await Cart.find({client: data.client, product: data.product, variety: data.variety})
        
        if (cartClient.length == 0) {
            let reg = await Cart.create(data)
            res.status(200).send({data:reg})
        } else if(cartClient.length >= 1){
            res.status(200).send({data:undefined})
        }

        
        
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const getCart_client = async (req, res) => {
    if(req.user){

        let id = req.params['id']

        let cartClient = await Cart.find({client: id}).populate('product')
        res.status(200).send({data: cartClient})
         
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

const deleteCart_client = async (req, res) => {
    if(req.user){

        let id = req.params['id']

        let reg = await Cart.findByIdAndRemove({_id: id})
        res.status(200).send({data: reg})
         
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}



module.exports = {
    addCart_client,
    getCart_client,
    deleteCart_client
}