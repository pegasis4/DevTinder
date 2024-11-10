const express=require("express")
const profileRouter=express.Router()
const { userAuth } = require("../middlewares/auth")

profileRouter.get("/profile",userAuth,async (req,res)=>{
    try{ 
        const user=req.user
        if(!user){
            throw new Error("user not found")
        }
        res.send(user)
    }
    catch(err){
        res.send("something went wrong",err)
    }
})
module.exports=profileRouter