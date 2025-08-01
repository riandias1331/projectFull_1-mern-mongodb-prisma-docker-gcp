import express from 'express'
const route = express.Router()

import userController from '../controllers/userController.js'
import auth from '../middlewares/auth.js'

// public Routes
route.get('/users', auth, userController.getUsers)
route.get('/users/:id', userController.getUser)
route.put('/users', userController.updateUser)
route.delete('/users/:id', userController.deleteUser)
route.delete('/users', userController.deleteUsers)

// Private Routes
route.post('/users', userController.createUser)

export default route
