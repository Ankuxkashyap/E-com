import {User} from '../models/user.model.js';
import  Product  from '../models/product.model.js';
import mongoose from 'mongoose';

export const getCart = async(req,res)=>{
    try{
        const userId = req.user.id;

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const cart = user.cart;

        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        }
        res.status(200).json(cart);
    }
    catch(error){
        console.error('Error fetching cart:', error);
        res.status(500).json({message:"Server error"});
    }
}

export const addToCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      if (!productId || !quantity) {
        return res.status(400).json({ message: 'Product ID and quantity are required' });
      }
  
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const cartItem = user.cart.find((item) => item.productId.toString() === productId);
  
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        user.cart.push({ productId, quantity });
      }
      await user.save();
  
      res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
      console.error('Error in addToCart:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  export const deleteFromCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const  productId  = req.params.id;
          
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const cartItemIndex = user.cart.findIndex(
        (item) => item.productId.toString() === productId
      );
  
      if (cartItemIndex === -1) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      user.cart.splice(cartItemIndex, 1);
  
      await user.save();
  
      res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
    } catch (error) {
      console.error('Error in deleteFromCart:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

export const updateCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const  productId  = req.params.id;
      const { quantity } = req.body;
  
      if (!quantity) {
        return res.status(400).json({ message: 'Quantity is required' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const cartItem = user.cart.find((item) => item.productId.toString() === productId);

      if (!cartItem) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      cartItem.quantity = quantity;
      await user.save();
  
      res.status(200).json({ message: 'Cart updated', cart: user.cart });
    } catch (error) {
      console.error('Error in updateCart:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

