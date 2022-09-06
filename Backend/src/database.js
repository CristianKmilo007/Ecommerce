const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config()

//URI de la Base de Datos
const uri = process.env.MONGODB_ATLAS

//Conexion a la Base de Datos
mongoose.connect(uri, {useUnifiedTopology: true})
    .then(() => console.log("Conectado a la Base de Datos"))
    .catch((error) => console.log(error))

//Exportacion
module.exports = mongoose;