const Router = require('express')
const router = new Router
const  educationController = require('../controllers/educationController')


router.post('/', educationController.add)
router.get('/', educationController.getAll)
router.get('/:id', educationController.getOne)
router.put('/:id', educationController.update)

module.exports = router