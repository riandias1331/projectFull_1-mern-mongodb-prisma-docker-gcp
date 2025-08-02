import express from 'express'
const route = express.Router()

import userController from '../controllers/userController.js'
import auth from '../middlewares/auth.js'
import validateUser from '../util/validator.js'

//Private Routes
route.get('/users', auth, userController.getUsers)
route.get('/users/:id', auth, userController.getUser)
route.put('/users', auth, validateUser, userController.updateUser)
route.delete('/users/:id', auth, userController.deleteUser)
route.delete('/users', auth, userController.deleteUsers)

//Public Routes
route.post('/users', validateUser, userController.createUser)
route.post('/api/register', validateUser, userController.register)
route.post('/api/login', userController.login)


export default route
