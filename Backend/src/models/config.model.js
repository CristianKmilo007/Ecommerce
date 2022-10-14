const mongoose = require('mongoose')
const {Schema} = mongoose

const configSchema = new Schema(
    {
        laboratories: [{type: Object, required: true}],
        nameBusiness: {type: String, required: true},
        logo: {type: String, required: true},
        serie: {type: String, required: true},
        correlative: {type: String, required: true},
        createdAt: {type: Date, default: Date.now, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Config', configSchema)