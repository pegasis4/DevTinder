const express=require('express')
const {connectDB}=require("./config/database")
const User=require("./models/user")
const app=express()

app.post("/signup",async (req,res)=>{
    const userObj={
        firstName:"Yash",
        lastName:"Padiyar",
        email:"yashucan4@gmail.com",
        password:"yash123"
    }
    const user=new User(userObj)//creating a new instance of a user model
    try{
        await user.save();
        res.send("user added successfully")
    }
    catch(err){
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
