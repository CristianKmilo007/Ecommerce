const mongoose = require('mongoose')
const {Schema} = mongoose

const dsaleSchema = new Schema(
    {
        client: {type: Schema.ObjectId, ref: 'Client', required: true},
        product: {type: Schema.ObjectId, ref: 'Product', required: true},
        sale: {type: Schema.ObjectId, ref: 'Sale', required: true},
        subtotal: {type: Number, required: true},
        variety: {type: String, required: true},
        stock: {type: Number, required: true},
        createdAt: {type: Date, default: Date.now, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Dsale', dsaleSchema)