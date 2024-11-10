const express=require("express")
const authRouter=express.Router()
const { validateSignUpData } = require("../utils/validation.js");
const User=require("../models/user.js")
const bcrypt=require("bcrypt")


authRouter.post("/login",async (req,res)=>{
    const {password,email}=req.body
    try{
        const user=await User.findOne({email:email})
        if(!user){
            throw new Error("user not registered")
        }
        const isPasswordCorrect=await user.validatePassword(password)
        if(isPasswordCorrect){
            const token=await user.getJWT()
            res.cookie("token",token,{httpOnly:true},{expiresIn:"1d"});
            res.send("login successful")
        }
        else{
            throw new Error("invalid credentials")
        }
    }
    catch(err){
        console.log(err)
        res.send("something went wrong")
    }
})
authRouter.post("/signup", async (req, res) => {
    try {
      validateSignUpData(req);
      const {password,firstName,lastName,email}=req.body
      const hashedpassword=await bcrypt.hash(password,10)
      const user = new User({
        firstName,
        lastName,
        email,
        password:hashedpassword
      });
      await user.save();
      res.send("User added successfully");
    } catch (err) {
      console.log(err.message);
      res.status(400).send(err.message); // Sending a descriptive error to the client
    }
  });
  authRouter.post("/logout",async(req,res)=>{
    try{
      res.cookie("token",null,{expiresIn:new Date(Date.now())})
      res.send("logout successful")
    }
    catch(err){
      console.log(err)
      res.send("something went wrong")
    }
  })
  module.exports=authRouter
  