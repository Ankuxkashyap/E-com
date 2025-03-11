import express from 'express';
import { getCart ,addToCart,deleteFromCart,updateCart } from '../controllers/cart.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/',authMiddleware,getCart);
router.post('/',authMiddleware,addToCart);
router.delete('/:id',authMiddleware,deleteFromCart);
router.put('/:id',authMiddleware,updateCart);

export default router;
