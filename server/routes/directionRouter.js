const Router = require('express')
const router = new Router
const  directionController = require('../controllers/directionController')


router.post('/', directionController.add)
router.get('/', directionController.getAll)
router.get('/:id', directionController.getOne)

module.exports = router