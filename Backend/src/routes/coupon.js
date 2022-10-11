const expres = require('express')
const couponController = require('../controllers/couponController')

const router = expres.Router()

const auth = require('../middlewares/authenticate')

router.post('/registerCoupon_Admin', auth.auth, couponController.registerCoupon_Admin)
router.get('/listCoupon_filterAdmin/:type/:filter?', auth.auth, couponController.listCoupon_filterAdmin)
router.get('/getCoupon_Admin/:id', auth.auth, couponController.getCoupon_Admin)
router.put('/updateCoupon_Admin/:id', auth.auth, couponController.updateCoupon_Admin) 
router.delete('/deleteCoupon_Admin/:id', auth.auth, couponController.deleteCoupon_Admin)

module.exports = router