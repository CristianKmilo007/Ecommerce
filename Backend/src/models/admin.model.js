const mongoose = require('mongoose')
const {Schema} = mongoose

const adminSchema = new Schema(
    {
        names: {type: String, required: true},
        lastnames: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        phone: {type: String, required: true},
        rol: {type: String, required: true},
        identification: {type: String, required: true},
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Admin', adminSchema)