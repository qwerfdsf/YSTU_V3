const Router = require('express')
const router = new Router
const  skillsController = require('../controllers/skillsController')


router.post('/', skillsController.add)
router.get('/', skillsController.getAll)
router.get('/:id', skillsController.getOne)
router.put('/:id', skillsController.update)

module.exports = router