const mongoose = require('mongoose')
const {Schema} = mongoose

const inventorySchema = new Schema(
    {
        product: {type: Schema.ObjectId, ref: 'Product', required: true},
        stock: {type: Number, required: true},
        admin: {type: Schema.ObjectId, ref: 'Admin', required: true},
        supplier: {type: String, required: false},
        createdAt: {type: Date, default: Date.now, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Inventory', inventorySchema)