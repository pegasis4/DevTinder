const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{
        type:String,
    },
    password:String,
    age:{
        type:Number,
    },
    gender:{
        type:Number,
    }
})
const User=mongoose.model("User",userSchema)
module.exports=User;