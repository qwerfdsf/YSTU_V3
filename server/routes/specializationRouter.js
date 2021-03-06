const Router = require('express')
const router = new Router
const  specializationController = require('../controllers/specializationController')


router.post('/', specializationController.add)
router.get('/', specializationController.getAll)
router.get('/:id', specializationController.getOne)
router.put('/:id', specializationController.update)

module.exports = router