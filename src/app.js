const express=require('express')
const app=express()

app.use("/test",(req,res)=>{
    res.send("hello hii")
})
app.get("/user/:id",(req,res)=>{
    const res1=req.params
    console.log(res1)    
    res.send({"name":"yash","age":"20"})
})

app.post("/user",(req,res)=>{
    res.send("save data to db")
})
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})