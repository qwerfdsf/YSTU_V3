const Router = require('express')
const router = new Router
const  profileController = require('../controllers/profileController')


router.post('/', profileController.add)
router.get('/', profileController.getAll)
router.get('/:id', profileController.getOne)
router.put('/:id', profileController.update)

module.exports = router