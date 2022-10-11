const mongoose = require('mongoose')
const {Schema} = mongoose

const couponSchema = new Schema(
    {
        code: {type: String, required: true},
        type: {type: String, required: true},
        value: {type: Number, required: true},
        limit: {type: Number, required: true},
        createdAt: {type: Date, default: Date.now, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Coupon', couponSchema)