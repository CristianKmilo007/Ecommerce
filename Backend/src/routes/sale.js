const { application } = require('express')
const expres = require('express')
const saleController = require('../controllers/saleController')

const router = expres.Router()

const auth = require('../middlewares/authenticate')

router.post('/registerBuy_client', auth.auth, saleController.registerBuy_client)

module.exports = router