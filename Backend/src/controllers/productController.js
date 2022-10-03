const productModel = require('../models/product.model')
const Product = require('../models/product.model')

const registerProduct_Admin = async (req, res) => {
    if(req.user){
        if(req.user.role == 'Admin'){

            let data = req.body
            let imgPath = req.files.image.path
            let name = imgPath.split('\\')
            let nameImg = name[2]

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



module.exports = {
    registerProduct_Admin
}
