const Sale = require('../models/sale.model')
const Dsale = require('../models/detailsale.model')
const Product = require('../models/product.model')
const Cart = require('../models/cart.model')


const registerBuy_client = async (req, res) => {
    if(req.user){
        
        let data = req.body
        let details = data.details

        let sale_last = await Sale.find().sort({createdAt: -1})
        let serie
        let correlative
        let nsale

        if(sale_last.length == 0){
            serie = '001'
            correlative = '000001'

            nsale = serie + '-' + correlative
        }else{
            let nsale_last = sale_last[0].nsale
            let arr_nsale = nsale_last.split('-')

            if(arr_nsale[1] != '999999'){
                let new_correlative = zfill(parseInt(arr_nsale[1])+1, 6)
                nsale = arr_nsale[0] + '-' + new_correlative
            }else if(arr_nsale[1] == '999999'){
                let new_serie = zfill(parseInt(arr_nsale[0])+1, 3)
                nsale = new_serie + '-000001'
            }
        }

        data.nsale = nsale
        data.be = 'Procesando'

        let sale = await Sale.create(data)

        details.forEach(async element => {
            element.sale = sale._id
            await Dsale.create(element)

            let element_product = await Product.findById({_id:element.product})
            let new_stock = element_product.stock - element.stock

            await Product.findByIdAndUpdate({_id:element.product},{
                stock:new_stock
            })

            await Cart.remove({client:data.client})
        });

        res.status(200).send({sale:sale})
        
    }else{
        res.status(500).send({message: 'NoAccess'})
    }
}

function zfill(number, width) {
    let numberOutput = Math.abs(number); 
    let length = number.toString().length;
    let zero = "0";
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }

    }
}


module.exports = {
    registerBuy_client
}