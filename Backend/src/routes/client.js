const expres = require('express')
const clientController = require('../controllers/clientController')

const router = expres.Router()

const auth = require('../middlewares/authenticate')

router.post('/registerClient', clientController.registerClient)
router.post('/loginClient', clientController.loginClient)

router.get('/listClient_filterAdmin/:type/:filter', auth.auth, clientController.listClient_filterAdmin)
router.post('/registerClient_Admin', auth.auth, clientController.registerClient_Admin )
router.get('/getClient_Admin/:id', auth.auth, clientController.getClient_Admin)
router.put('/updateClient_Admin/:id', auth.auth, clientController.updateClient_Admin)
router.delete('/deleteClient_Admin/:id', auth.auth, clientController.deleteClient_Admin)


module.exports = router