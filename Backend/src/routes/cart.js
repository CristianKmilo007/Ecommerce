const { application } = require('express')
const expres = require('express')
const cartController = require('../controllers/cartController')

const router = expres.Router()

const auth = require('../middlewares/authenticate')

router.post('/addCart_client', auth.auth, cartController.addCart_client)
router.get('/getCart_client/:id', auth.auth, cartController.getCart_client)
router.delete('/deleteCart_client/:id', auth.auth, cartController.deleteCart_client)


module.exports = router