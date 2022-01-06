const Router = require('express')
const router = new Router
const  employerController = require('../controllers/employerController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration', employerController.registration)
router.post('/login', employerController.login)
router.get('/auth',authMiddleware, employerController.check)
router.get('/registration', employerController.getAll)
router.get('/registration/:id', employerController.getOne)

module.exports = router