const mongoose = require('mongoose')
const {Schema} = mongoose

const adressSchema = new Schema(
    {
        client: {type: Schema.ObjectId, ref: 'Client', required: true},
        addressee: {type: String, required: true},
        identification: {type: String, required: true},
        zip: {type: String, required: true},
        address: {type: String, required: true},
        country: {type: String, required: true},
        state: {type: String, required: true},
        city: {type: String, required: true},
        phone: {type: String, required: true},
        main: {type: Boolean, required: true},
        createdAt: {type: Date, default: Date.now, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Adress', adressSchema)