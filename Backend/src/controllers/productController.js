const Product = require('../models/product.model')

const registerProduct_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){

            let data = req.body
            console.log(data);
            console.log(req.files);

        }else{
            res.status(500).send({message: 'NoAccess'})
        }
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}



module.exports = {
    registerProduct_Admin
}
