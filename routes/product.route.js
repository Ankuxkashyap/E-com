import express from "express";
import { createProduct ,getProducts,getProduct,deleteProduct,updateProduct} from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/",getProducts);
router.get("/:id",getProduct);
router.delete("/:id",deleteProduct);
router.put("/:id",upload.single('image'),updateProduct);
router.post("/", authMiddleware,upload.single('image'), createProduct);


export default router;