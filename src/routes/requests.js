const express=require("express")
const requestsRouter=express.Router()
const {userAuth}=require("../middlewares/auth")

requestsRouter.post("/sendConnectionRequest",userAuth,async (req,res)=>{
    const user=req.user
    res.send(user.firstName+ " has send a connection request ")
})
module.exports=requestsRouter