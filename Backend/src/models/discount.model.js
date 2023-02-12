const mongoose = require('mongoose')
const {Schema} = mongoose

const discountSchema = new Schema(
    {
        title: {type: String, required: true},
        banner: {type: String, required: true},
        discount: {type: Number, required: true},
        dateInit: {type: String, required: true},
        dateFinish: {type: String, required: true},
        createdAt: {type: Date, default: Date.now, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Discount', discountSchema)