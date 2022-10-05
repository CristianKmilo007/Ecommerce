const { application } = require('express')
const expres = require('express')
const productController = require('../controllers/productController')

const router = expres.Router()
const auth = require('../middlewares/authenticate')
const multiparty = require('connect-multiparty')
const path = multiparty({uploadDir: './src/uploads/products'})

router.post('/registerProduct_Admin', [auth.auth, path], productController.registerProduct_Admin)
router.get('/listProducts_filterAdmin/:type/:filter', auth.auth, productController.listProducts_filterAdmin)
router.delete('/deleteProduct_Admin/:id', auth.auth, productController.deleteProduct_Admin)
router.get('/getFrontPage/:img', productController.getFrontPage)
router.get('/getProduct_Admin/:id', auth.auth, productController.getProduct_Admin)
router.put('/updateProduct_Admin/:id', [auth.auth, path], productController.updateProduct_Admin)

module.exports = router