import bcrypt from 'bcrypt'
import  { User }  from '../models/user.model.js';
import jwt from 'jsonwebtoken'

export const userRigester = async (req, res) => {
    try{
        const { email , name , password} = req.body;
        const user = await User .findOne({ email }); 
        if (user) {     
            return res.status(400).json({ message: "User already exists" });
        }
    const hashPassword = await bcrypt.hash(password,10)

    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save()
    res.status(200).json({message:"User Created "});
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

export const userLogin = async(req,res)=>{
    try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not found"});
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '1h',});

    res.cookie('token',token,{httpOnly:true});
    res.status(200).json({token});
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }

}
