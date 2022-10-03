const { application } = require('express')
const expres = require('express')
const productController = require('../controllers/productController')

const router = expres.Router()
const auth = require('../middlewares/authenticate')
const multiparty = require('connect-multiparty')
const path = multiparty({uploadDir: './src/uploads/products'})

router.post('/registerProduct_Admin', [auth.auth, path], productController.registerProduct_Admin)

module.exports = router