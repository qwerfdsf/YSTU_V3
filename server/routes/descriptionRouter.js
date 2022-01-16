const Router = require('express')
const router = new Router
const  descriptionController = require('../controllers/descriptionController')


router.post('/', descriptionController.add)
router.get('/', descriptionController.getAll)
router.get('/:id', descriptionController.getOne)
router.put('/:id', descriptionController.update)

module.exports = router