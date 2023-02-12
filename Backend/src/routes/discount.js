const expres = require('express')
const discountController = require('../controllers/discountController')

const router = expres.Router()
const auth = require('../middlewares/authenticate')
const multiparty = require('connect-multiparty')
const path = multiparty({uploadDir: './src/uploads/discounts'})

router.post('/registerDiscount_Admin', [auth.auth, path], discountController.registerDiscount_Admin)
router.get('/listDiscount_Admin/:filter?', auth.auth, discountController.listDiscount_Admin)
router.get('/getBanner_discount/:img', discountController.getBanner_discount)
router.get('/getDiscount_Admin/:id', auth.auth, discountController.getDiscount_Admin)
router.put('/updateDiscount_Admin/:id', [auth.auth, path], discountController.updateDiscount_Admin)
router.delete('/deleteDiscount_Admin/:id', auth.auth, discountController.deleteDiscount_Admin)
router.get('/getDiscount_Active', discountController.getDiscount_Active)

module.exports = router