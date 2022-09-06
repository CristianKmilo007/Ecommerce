const express = require("express")
const dotenv = require('dotenv')
const cors = require("cors")
const morgan = require("morgan")
const bodyparser = require('body-parser')

const app = express()
const port = process.env.PORT || 5000

const clientRoute = require('./routes/client')
const adminRoute = require('./routes/admin')

//Variables de Entorno
dotenv.config()

app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

//Base de datos
require("./database.js")

//Rutas

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json({limit: '50mb', extended: true}))

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
})

app.use('/api/client', clientRoute)
app.use('/api/admin', adminRoute)

app.listen(port, () => console.log("Ejecutando Api en el puerto", port))

module.exports = app