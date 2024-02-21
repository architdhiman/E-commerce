import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDb from "../e-commerce/config/db.js"
import authRoute from './routes/authRoute.js';
import cors from "cors"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import formidable from 'express-formidable';

dotenv.config()
const app = express()

connectDb()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('dev'))
app.use(formidable())

app.get('/healthcheck', (req, res) => {
    return res.send({status: 200, message: "Health check || sab badiya"})
})

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

app.get('/', (req, res) => {
    res.send({
        message:"Welcome"
    })
})

app.listen(PORT, ()=>{
    console.log(`Port running at ${PORT}`)
})
