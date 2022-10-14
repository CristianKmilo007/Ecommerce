const expres = require('express')
const configController = require('../controllers/configController')

const router = expres.Router()

const auth = require('../middlewares/authenticate')

const multiparty = require('connect-multiparty')
const path = multiparty({uploadDir: './src/uploads/configurations'})


router.put('/updateConfig_Admin/:id', [auth.auth,path], configController.updateConfig_Admin) 
router.get('/getConfig_Admin', auth.auth, configController.getConfig_Admin)
router.get('/getFrontPage/:img', configController.getFrontPage)
router.get('/getConfig_Public/', configController.getConfig_Public)
router.delete('/deleteLaboratories_Admin/:id', configController.deleteLaboratories_Admin)



module.exports = router