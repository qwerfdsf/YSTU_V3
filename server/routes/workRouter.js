const Router = require('express')
const router = new Router
const  workController = require('../controllers/workController')


router.post('/', workController.add)
router.get('/', workController.getAll)
router.get('/:id', workController.getOne)
router.put('/:id', workController.update)

module.exports = router