import express  from "express";
import {loginController, registerController,testController,forgotPasswordController, updateProfileController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/forgot-password', forgotPasswordController)
router.get('/test',requireSignIn, isAdmin ,testController)
router.get('/user-auth', requireSignIn, (req,res)=>{  
    // after private.js hit it , it will say okay as acknowledge
    return res.status(200).send({ok:true})
})
router.get('/admin-auth', requireSignIn,isAdmin, (req,res)=>{
    // after AdminRoute.js hit it , it will say okay as acknowledge
    return res.status(200).send({ok:true})
})

router.put('/profile', requireSignIn, updateProfileController)
export default router