import express from "express";
import { createProduct ,getProducts,getProduct,deleteProduct,updateProduct,getProductByCategory} from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import {isAdmin} from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/",getProducts);
router.get("/:id",getProduct);
router.get("/category/:category",getProductByCategory);
router.delete("/:id",authMiddleware,isAdmin ,deleteProduct);
router.put("/:id",authMiddleware,isAdmin,upload.single('image'),updateProduct);
router.post("/", authMiddleware, isAdmin,upload.single('image'), createProduct);


export default router;