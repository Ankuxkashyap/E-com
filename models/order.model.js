import mongoose  from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required : true
    },
    product:{
        type: mongoose.Schema.ObjectId,
        ref : "Product",
        required : true
    },
    status:{
        type: String,
        default : "Panding",
        required : true 
    }
})

export const Order = mongoose.model("Order",orderSchema);
