import express from 'express'
import { getProductByID, getProducts } from '../controllers/productController.js'
const router = express.Router()
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUsers,
    getUsersbyID,
    updateUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect,admin,getUsers)
router.post('/logout', logoutUser)
router.post('/auth', authUser)


router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(protect,admin,deleteUsers).get(protect,admin,getUsersbyID).put(protect,admin,updateUser)


export  default router