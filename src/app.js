const express=require('express')
const {connectDB}=require("./config/database")
const User=require("./models/user")
const app=express()

app.use(express.json())
app.post("/signup",async (req,res)=>{
    console.log(req.body)
    const userObj=req.body
    const user=new User(userObj)//creating a new instance of a user model
    try{
        await user.save();
        res.send("user added successfully")
    }
    catch(err){
        console.log(err)
        res.send("some error while saving in db")

    }

})
connectDB()
.then(()=>{
    console.log("database connected")
    app.listen(3000,()=>{
        console.log("server is running on port 3000")
    })
})
.catch((err)=>{
    console.log("database connection failed")
})
