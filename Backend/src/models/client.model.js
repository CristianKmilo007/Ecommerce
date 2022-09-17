const mongoose = require('mongoose')
const {Schema} = mongoose

const clientSchema = new Schema(
    {
        names: {type: String, required: true},
        lastnames: {type: String, required: true},
        identification: {type: String, required: false},
        phone: {type: String, required: false},
        email: {type: String, required: true},
        direction: {type: String, required: false},
        city: {type: String, required: false},
        country: {type: String, required: false},
        establishment: {type: String, required: false},
        password: {type: String, required: true},
        profile: {type: String, default: 'perfil.png', required: true},
        gender: {type: String, required: false},
        dateBirth: {type: String, required: false}, 
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Client', clientSchema)