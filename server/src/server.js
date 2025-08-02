import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
import cors from 'cors'
import errorHandler from './middlewares/errorHandle.js'


dotenv.config()
const app = express()
const port = process.env.PORT

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use(routes)

// Database
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('DataBase connected')
        app.emit('DataBase')
    })
    .catch(()=> {
        console.log('DataBase is not connected')
    })

// Error Handler
app.use(errorHandler)

// Server
app.on('DataBase', () => {
    app.listen(port, () => {
        console.log(`Server is runnng in http://localhost:${port}/users`)
    })
})