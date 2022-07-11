const router = require('express').Router()
const ListController = require('../controllers/ListController')

//Middleware
const verifyToken = require('../helpers/verify-token')

router.post('/', verifyToken, ListController.createList);
router.get('/', verifyToken, ListController.getList);
router.patch('/:id', verifyToken, ListController.updateList);
router.delete('/:id', verifyToken, ListController.deleteList);
router.post('/:id/item', verifyToken, ListController.createItem);
// router.patch('/item', verifyToken, ListController.editItem);
// router.delete('/item', verifyToken, ListController.deleteItem);

module.exports = router;