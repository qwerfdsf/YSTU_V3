const Router = require('express')
const router = new Router
const  eventsController = require('../controllers/eventsController')


router.post('/', eventsController.add)
router.get('/', eventsController.getAll)
router.get('/:id', eventsController.getOne)

module.exports = router