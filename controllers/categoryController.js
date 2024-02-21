import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"
export const createCategoryController = async(req,res) =>{
    try {
        const {name} = req.body
        if(!name)
        {
            return res.status(404).send({message:"name is required"})
        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory)
        {
            return res.status(200).send({message:"category already exists",success:true})
        }
        const category = await new categoryModel({name,slug:slugify(name)}).save()
        res.status(200).send({message:"category created",success:true,category})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"error creating category", success:false,error})
    }
}

export const updateCategoryController = async(req,res) =>{
    try {
        const{name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id , {name , slug:slugify(name)}, {new:true})
        return res.status(200).send({message:"category updated",success:true,category})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"couldn't update",success:false,error})
    }
}

export const categoryController = async(req,res) =>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({message:"categorys called",success:true,category})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"failed to fetch category",error,success:false})        
    }
}

export const singleCategoryController = async(req,res) =>{
    try {        
        const category = await categoryModel.findOne({slug: req.params.slug})
        res.status(200).send({success:true,message:"single category called",category})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"failed to fetch single category",error,success:false}) 
    }
}

export const deleteCategoryController = async(req,res) =>{
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        return res.status(200).send({success:true,message:"category deleted",id})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"failed to delete category",error,success:false}) 
    }
}