const router = require('express').Router()
const StandardListController = require('../controllers/StandardListController')

//Middleware
const verifyToken = require('../helpers/verify-token')

router.post('/standard', verifyToken, StandardListController.createStandard);
router.patch('/standard', verifyToken, StandardListController.editStandard);
router.delete('/standard', verifyToken, StandardListController.deleteStandard);

module.exports = router;