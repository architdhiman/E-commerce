import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js"
const SECRET_KEY = "hello2024"

export const requireSignIn = async(req,res,next) =>{
    try {
        const decode = JWT.verify(req.headers.authorization,SECRET_KEY)
        req.user = decode
        next()
    } catch (error) {
        console.error(error)
    }
}

export const isAdmin = async(req, res, next) =>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1)
        return res.status(401).send({
            message:"access denied",
            success:false
    })
    else{
        next()
    }} catch (error) {
        console.log(error)
        res.status(401).send({
            message:"error in admin middleware",
            error,
            success:false
    })
    }
}