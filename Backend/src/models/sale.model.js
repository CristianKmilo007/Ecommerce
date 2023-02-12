const mongoose = require('mongoose')
const {Schema} = mongoose

const saleSchema = new Schema(
    {
        client: {type: Schema.ObjectId, ref: 'Client', required: true},
        nsale: {type: String, required: true},
        subtotal: {type: Number, required: true},
        shippingTitle: {type: String, required: true},
        shippingPrice: {type: Number, required: true},
        transaction: {type: String, required: true},
        coupon: {type: String, required: false},
        be: {type: String, required: true},
        address: {type: Schema.ObjectId, ref: 'Adress', required: true},
        note: {type: String, required: false},
        createdAt: {type: Date, default: Date.now, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Sale', saleSchema)