const Router = require('express')
const router = new Router
const  vacancyController = require('../controllers/vacancyController')


router.post('/', vacancyController.add)
router.get('/', vacancyController.getAll)
router.get('/:id', vacancyController.getOne)

module.exports = router