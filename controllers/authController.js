import { comparePassword, hashpassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken"
const SECRET_KEY = "hello2024"

const registerController = async(req,res) =>{
    console.log(req.body)
    try {         
        const {name,email,password,phone,address,answer} = req.body
        if(!name)
        {
            return res.send({message: "name is required"})
        }
        if(!email)
        {
            return res.send({message: "email is required"})
        }
        if(!password)
        {
            return res.send({message: "password is required"})
        }
        if(!phone)
        {
            return res.send({message: "phone is required"})
        }
        if(!address)
        {
            return res.send({message: "address is required"})
        }
        if(!answer)
        {
            return res.send({message: "answer is required"})
        }
        const existingUser = await userModel.findOne({email:email})
        if(existingUser)
        return res.send({message:"user already registered"})
        
        const hashedpassword = await hashpassword(password)
        const user = await new userModel({name,email,password:hashedpassword,phone,address,answer}).save()
        res.status(201).send({message:"user has been registered",success:true,user})

        
    } catch (error) {
        res.status(500).send({
            message: 'error while registering',
            error,
            success: false
        })
    }
}

const loginController = async (req, res) => {
    try {
        const{email,password} = req.body
        if(!email)
        {
            return res.send({message: "email is required"})
        }
        if(!password)
        {
            return res.send({message: "password is required"})
        }
        const user = await userModel.findOne({email})
        if(!user)
        {
            return res.status(404).send({message:"email not found",success:false})
        }
        const match = await comparePassword(password,user.password)
        if(!match)
        {
            return res.status(404).send({message:"password is wrong",success:false})
        }
        const token = await JWT.sign({_id:user._id},SECRET_KEY,{expiresIn:"7d"})
        res.status(201).send({message:"user logged in",success:true,user:{
            name:user.name,
            email:user.email
        },token}) 

    } catch (error) {
        res.send({error: error.message,
        message:"login failed",
        success: false})
    }
}

const testController = async(req,res) =>{
    try {
        res.status(200).send({message:"protected routes",success:true})
    } catch (error) {
        res.status(500).send({
            message:"problem in test route",
            error
        })
    }
}

const forgotPasswordController = async(req,res) =>{
    try {
        const{email,answer,newPassword} = req.body
        if(!email){
            res.status(400).send({message:"email is required"})
        }
        if(!answer){
            res.status(400).send({message:"answer is required"})
        }
        if(!newPassword){
            res.status(400).send({message:"new password is required"})
        }
        const user = await userModel.findOne({email,answer})
        if(!user)
        {
            res.status(401).send({message:"user not found"})
        }
        const hashed = await hashpassword(newPassword)
        await userModel.findByIdAndUpdate(user._id ,{password:hashed})
        res.status(200).send({success:true,message:"password updated successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:"problem in forgot password route",error})
    }

}

export {registerController,loginController,testController,forgotPasswordController}