const mongoose = require('mongoose')
const {Schema} = mongoose

const cartSchema = new Schema(
    {
        product: {type: Schema.ObjectId, ref: 'Product', required: true},
        client: {type: Schema.ObjectId, ref: 'Client', required: true},
        stock: {type: Number, required: true},
        variety: {type: String, required: true},
        createdAt: {type: Date, default: Date.now, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Cart', cartSchema)