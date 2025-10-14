import express from 'express'

import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import productRoutes from '../backend/routes/productRoutes.js'
import notFound from '../backend/middleware/errorMiddleware.js'
const port = process.env.PORT || 5000
 dotenv.config()
connectDB()
const app = express()


app.use(cors()); // allow all origin



app.get('/',(req, res)=>{
    res.send('API is running....')
})

app.use('/api/products', productRoutes)

app.use(notFound)


app.listen(port, ()=>console.log(`Server Running ${port}`))