import Product from "../models/product.model.js";
import { cloudinary } from "../config/cloudinary.js";

export const createProduct = async (req, res) => {
    try {
        const { name, price, description,category } = req.body;
        const image = req.file;
        
        if (!name || !category || !description || !price || !image) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (!req.file) {
          return res.status(400).json({ message: 'No image uploaded' });
        }
    
        
        const product = new Product({
          name,
          price,
          description,
          category,
          image: {
            public_id: image.filename,
            url: image.path,
          },
        });
    
        await product.save();
    
        res.status(201).json({ message: 'Product added successfully', product });
      } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Server error' });
      }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const getProduct = async(req,res) =>{
    try{
      const id = req.params.id;
      const product  = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    }catch(error){
      res.status(500).json({message:"Server error"});

    }
};

export const deleteProduct = async(req,res)=>{
  try{
      const id = req.params.id;
      console.log(id  )
      const product = await Product.findByIdAndDelete(id);
      if(!product){
        return res.status(404).json({message:"Product not found"});
      }

      await cloudinary.uploader.destroy(product.image.public_id);

      res.status(200).json({message:"Product Deleted successfully "});
  }
  catch(error){
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const {name, price, description, category} = req.body;
    const image = req.file;

    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name;
    Product.price = price;
    product.description = description;
    product.category = category;
    
    product.image = {
      public_id: image.filename,
      url: image.path,
    };
    await product.save();
    res.status(200).json({ message: 'Product updated successfully', product });
  }
  catch(error){
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }

};