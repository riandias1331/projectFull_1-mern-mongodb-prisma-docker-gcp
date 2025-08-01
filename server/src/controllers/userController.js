import dotenv from 'dotenv';
dotenv.config();
import User from '../models/models.js'
import jwt from "jsonwebtoken";
const jwt_secret = process.env.JWT_SECRET;


const userController = {
    async getUsers(req, res) {
        try {
            const user = await User.find()
            res.status(200).json({ message: "Listed Users", user })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    async getUser(req, res) {
        try {
            const userId = req.params.id
            const user = await User.findById(userId)

            if (!user) {
                res.status(400).json({ message: error.message })
            }

            res.status(200).json({ message: "User Searched", user })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body
            const user = await User.create({
                name,
                email,
                password
            })
            const token = jwt.sign({ id: user.id }, jwt_secret, { expiresIn: "1h" });
            console.log('Token: ', token);
            res.status(201).json({ message: 'User created successfully', token, user });
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    async updateUser(req, res) {
        try {
            const userId = req.params.id
            userUpdate = req.body
            const user = await User.findByIdAndUpdate(userId, userUpdate, { new: true })

            if (!user) {
                res.status(400).json({ message: error.message })
            }

            res.status(200).json({ message: "Deleted User", user })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    async deleteUser(req, res) {
        try {
            const userId = req.params.id
            const user = await User.findByIdAndDelete(userId)

            if (!user) {
                res.status(400).json({ message: error.message })
            }

            res.status(200).json({ message: "Deleted User", user })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    async deleteUsers(req, res) {
        try {
            const user = await User.deleteMany()
            res.status(200).json({ message: "All Users Deleted", user })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }


}

export default userController