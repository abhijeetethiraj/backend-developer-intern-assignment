const User= require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// REGISTER USER

 const registerUser = async(req,res)=>{
    try {
        const {name,email,password,role} = req.body;
        const existingUser = await User.findOne({email})
        // check the user 
        if(existingUser){
            return res.status(400).json({message:"user Alredy exists"});
        }
        //harsh
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)

        //create new User
        const newuser = await User.create({
            name,email,password:hash,role
        })
        res.status(201).json({message:"user successfully",user:newuser})
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message})
    }
}

//LOGIN USER
 const login = async(req,res) =>{
    try {
        const{email,password} = req.body
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message:"Invalid credentails"})
        const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
        return res.status(400).json({message:"Imvalid credentails"})  
    
    //create token
    const token = jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
        res.status(200).json({
         user:{id:user._id,name:user.name,email:user.email,role:user.role}, token
        })
    
    } catch (error) {
         res.status(500).json({ message: "Server error", error: error.message });
    }
}
module.exports = {registerUser,login}