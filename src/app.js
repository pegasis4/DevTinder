const express=require('express')
const {connectDB}=require("./config/database")
const User=require("./models/user")
const app=express()

app.use(express.json()) 
app.get("/feed",async (req,res)=>{
    const result=await User.find({})
    console.log(result)
    res.send(result)
})
app.get("/userbyid",async (req,res)=>{
        try { 
            console.log(id)
            const user=await User.findById(id)
            if(user.length===0){
                res.send("no user exists with given id")
            }
            else{
                res.send(user)
            }
        } 
        catch(err){
            console.log(err)
            res.send("something went wrong")
        }
})
app.get("/user",async (req,res)=>{
    const eid=req.body.email
    console.log(eid)
    try{
      const users=await User.findOne({email:eid})
      if(users.length===0){
        res.send("no user exists with given email")
      }
      else{
        res.send(users)
      }
    }
    catch(err){
        console.log(err)
        res.send("something went wrong")
    }
})
app.delete("/user",async (req,res)=>{
    const id=req.body.id
    const userr=await User.findById(id)
    if(userr.length===0){
        res.send("no user exists with given id")
    }
    else{
        try{
            await User.findByIdAndDelete(id)
            res.send("user deleted successfully")
        }
        catch(err){
            console.log(err)
            res.send("something went wrong")
        }
    }

})
app.patch("/user",async (req,res)=>{
   const id=req.body.id
   const data=req.body
   try{
    await User.findByIdAndUpdate(id,data)
    res.send("user updated successfully")
   } 
   catch(err){
    res.send("something went wrong")
   }
})
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
