const router = require('express').Router()
const ListController = require('../controllers/ListController')

//Middleware
const verifyToken = require('../helpers/verify-token')

//Lists
router.post('/', verifyToken, ListController.createList);
router.get('/', verifyToken, ListController.getList);
router.patch('/:id', verifyToken, ListController.updateList);
router.delete('/:id', verifyToken, ListController.deleteList);

//Itens
router.post('/:id/item', verifyToken, ListController.createItem);
router.patch('/:id/item', verifyToken, ListController.updateItem);

module.exports = router;