import express from 'express'

import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import productRoutes from '../backend/routes/productRoutes.js'
import userRoutes from '../backend/routes/userRoutes.js'
import notFound from '../backend/middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'
const port = process.env.PORT || 5000
 dotenv.config()
connectDB()
const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser())


app.use(cors()); // allow all origin



app.get('/',(req, res)=>{
    res.send('API is running....')
})

app.use('/api/products', productRoutes)
app.use('/api/users',userRoutes)



app.use(notFound)


app.listen(port, ()=>console.log(`Server Running ${port}`))