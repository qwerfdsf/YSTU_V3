const Router = require('express')
const router = new Router
const  facultyController = require('../controllers/facultyController')


router.post('/', facultyController.add)
router.get('/', facultyController.getAll)
router.get('/:id', facultyController.getOne)
router.put('/:id', facultyController.update)

module.exports = router