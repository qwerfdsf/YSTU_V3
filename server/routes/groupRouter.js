const Router = require('express')
const router = new Router
const  groupController = require('../controllers/groupController')


router.post('/', groupController.add)
router.get('/', groupController.getAll)
router.get('/:id', groupController.getOne)
router.put('/:id', groupController.update)

module.exports = router