const Router = require('express')
const router = new Router
const studentRouter = require('./studentRouter')
const groupRouter = require('./groupRouter')
const directionRouter = require('./directionRouter')
const profileRouter = require('./profileRouter')
const facultyRouter = require('./facultyRouter')
const specializationRouter = require('./specializationRouter')
const educationRouter = require('./educationRouter')
const eventsRouter = require('./eventsRouter')
const skillsRouter = require('./skillsRouter')
const descriptionRouter = require('./descriptionRouter')


router.use('/student', studentRouter)
router.use('/group', groupRouter)
router.use('/direction', directionRouter)
router.use('/profile', profileRouter)
router.use('/faculty', facultyRouter)
router.use('/specialization', specializationRouter)
router.use('/education', educationRouter)
router.use('/events', eventsRouter)
router.use('/skills', skillsRouter)
router.use('/description', descriptionRouter)


module.exports = router