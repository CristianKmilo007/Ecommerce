const expres = require('express')
const clientController = require('../controllers/clientController')

const router = expres.Router()

router.post('/registerClient', clientController.registerClient)
router.post('/loginClient', clientController.loginClient)


module.exports = router