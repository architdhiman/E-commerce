import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDb from "../e-commerce/config/db.js"
import authRoute from './routes/authRoute.js';
import cors from "cors"

dotenv.config()
const app = express()

connectDb()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRoute)

app.get('/', (req, res) => {
    res.send({
        message:"Welcome"
    })
})

app.listen(PORT, ()=>{
    console.log(`Port running at ${PORT}`)
})
