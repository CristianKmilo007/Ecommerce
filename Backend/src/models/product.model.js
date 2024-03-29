const mongoose = require('mongoose')
const {Schema} = mongoose

const productSchema = new Schema(
    {
        title: {type: String, required: true},
        slug: {type: String, required: true},
        gallery: [{type:Object, required: false}],
        image: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String, required: true},
        stock: {type: Number, required: true},
        sales: {type: Number, default: 0, required: true},
        points: {type: Number, default: 0, required: true},
        laboratory: {type: String, required: true},
        varieties: [{type:Object, required: false}],
        titleVariety: {type: String, required: false, default: 'N/A'},
        status: {type: String, default: 'Edit', required: true},
        createdAt: {type: Date, default: Date.now, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Product', productSchema)