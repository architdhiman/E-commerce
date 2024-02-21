import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs"
import { populate } from "dotenv";


export const createProductController = async(req,res) =>{
    try {
        const{name,slug,description,price,category,quantity,shipping} = req.fields
        console.log(name,slug,description,price,category,quantity,shipping)
        const{photo} = req.files
        switch(true)
        {
            case !name:
                return res.status(404).send({error:"name not found"})            
            case !description:
                return res.status(404).send({error:"description not found"})
            case !price:
                return res.status(404).send({error:"price not found"})
            case !category:
                return res.status(404).send({error:"category not found"})
            case !quantity:
                return res.status(404).send({error:"quantity not found"})            
            case photo && photo.size>1000000:
                    return res.status(404).send({error:"photo is required and should be less than 1mb"})
        }
        const products = await productModel({...req.fields,slug:slugify(name)})
        if(photo)
        {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(200).send({success:true,message: "product created successfully",products})
    } catch (error) {
        console.log(error);
        return res.status(404).send({message:"Error creating product",error,success:false})
    }
}

export const getProductController = async(req, res) =>{
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        return res.status(200).send({success:true,total:products.length,message:"all products",products})
    } catch (error) {
        console.log(error);
        return res.status(404).send({message:"error getting product",error,success:false})
    }

}

export const getSingleProductController = async(req, res) =>{
    try {
        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category')
        return res.status(200).send({success:true,message:"single product",product})
    } catch (error) {
        console.log(error);
        return res.status(404).send({message:"error getting product",error,success:false})
    }
}

export const productPhotoController = async(req,res) =>{
    try {
        const product = await productModel.findById(req.params.pid).select('photo')
        if(product.photo.data)
        {
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        
    }
}

export const deleteProductController = async(req,res) =>{
    try {
        await productModel.findByIdAndDelte(req.params.pid)
        return res.status(200).send({message: 'Product deleted successfully',success: true})
    } catch (error) {
        console.log(error);
        return res.status(404).send({message:"error in deleting product",error,success:false})
        
    }
}

export const updateProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const products = await productModel.findByIdAndUpdate(
        req.params.pid,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Updated Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updte product",
      });
    }
  };