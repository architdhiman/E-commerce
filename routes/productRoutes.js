import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController,deleteProductController,getProductController,getSingleProductController,productPhotoController,updateProductController } from '../controllers/productController.js';

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin,createProductController);
router.get('/get-product', getProductController);
router.get('/get-product/:slug', getSingleProductController);
router.get('/product-photo/:pid', productPhotoController);
router.delete('/delete-product/:pid', deleteProductController);
router.put('/update-product/:pid', updateProductController);

export default router