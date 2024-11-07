const express=require('express')
const app=express()


const {adminAuth}=require("./middlewares/auth")
app.use("/admin",adminAuth)
app.get("/admin/data",(req,res)=>{
    res.send("admin data")
})
app.post("/user",(req,res)=>{
    res.send("save data to db")
})
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})