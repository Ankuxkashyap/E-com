import mongoose from "mongoose";

const productSchema =new  mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required :true,
        default: 0,
    },
    description:{
        type: String,
        required: true,
    },
    image: {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
    },
    category:{
        type: String,
        required: true,
    }, 
})

const Product = mongoose.model("product",productSchema);

export default Product;
