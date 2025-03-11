import express from "express";
import { PORT } from "./config/config.js";
import connectDb from "./config/db.js";
import userRoute from "./routes/user.route.js";
import cartRoute from "./routes/cart.route.js";
import cookieParser from "cookie-parser";
import productRoute from "./routes/product.route.js";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

connectDb();

app.get('/',(req,res)=>{
    res.send("All Good 💀");
})

app.use('/user',userRoute);
app.use('/product',productRoute);
app.use('/cart',cartRoute);

app.listen(PORT,()=>{
    console.log(`server is runing at port ${PORT}`);
})