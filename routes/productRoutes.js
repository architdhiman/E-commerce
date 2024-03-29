import express from 'express';
import formidable from "express-formidable"
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController,deleteProductController,getProductController,getSingleProductController,productCategoryController,productCountController,productFiltersController,productListController,productPhotoController,relatedProductsController,searchProductsController,updateProductController } from '../controllers/productController.js';

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin,formidable(),createProductController);
router.get('/get-product', getProductController);
router.get('/get-product/:slug', getSingleProductController);
router.get('/product-photo/:pid', productPhotoController);
router.delete('/delete-product/:pid', deleteProductController);
router.put('/update-product/:pid',formidable(), updateProductController);
router.post('/product-filters', productFiltersController)
router.get('/product-count', productCountController);
router.get('/product-list/:page', productListController);
router.get('/search/:keyword', searchProductsController);
router.get(`/related-product/:pid/:cid`, relatedProductsController);
router.get(`/product-category/:slug`, productCategoryController);

export default router