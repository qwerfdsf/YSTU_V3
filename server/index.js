require('dotenv').config()
const express = require('express')
const  sequelize = require('./connectdb')
const models = require('./models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const path = require('path')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')


const PORT = process.env.PORT || 8080

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({ }))
app.use('/api', router)


// обработка ошибок
app.use(errorHandler)


const  start = async () =>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () =>
            console.log('Server starting PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

start()