import express from 'express'
import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'
import { getProductByID, getProducts } from '../controllers/productController.js'
const router = express.Router()

// router.get('/', asyncHandler(async (req,res)=>{
    
// }))



// router.get('/:id', asyncHandler (async(req,res)=>{

//     // const product = products.find((p)=>p._id ===req.params.id)
    
// }))

router.route('/').get(getProducts)
router.route('/:id').get(getProductByID)


export  default router