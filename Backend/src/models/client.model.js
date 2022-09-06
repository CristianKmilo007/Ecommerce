const mongoose = require('mongoose')
const {Schema} = mongoose

const clientSchema = new Schema(
    {
        names: {type: String, required: true},
        lastnames: {type: String, required: true},
        email: {type: String, required: true},
        country: {type: String, required: false},
        password: {type: String, required: true},
        profile: {type: String, default: 'perfil.png', required: true},
        phone: {type: String, required: false},
        gender: {type: String, required: false},
        dateBirth: {type: String, required: false},
        identification: {type: String, required: false},
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Client', clientSchema)