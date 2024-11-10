const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:69,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email")
            }
        },   
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
        minAge:5,
    },
    gender:{
        type:String,
        validate(value){
           if(!(["male","female","other"].includes(value))){
            throw new Error("invalid gender")
           }
        },
    },
    photoUrl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid email")
            }
        },
    },
    about:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbgJDFLehkQpFnas_gqV8aGpJTzR26MIlsatrb458vJWIFM9KZpv0HXnSRsbHJ6VjLx4I&usqp=CAU",
    },
    skills:{
        type:[String]
    }
},{timestamps:true})

userSchema.methods.getJWT=async function(){
    const user=this
    const token=await jwt.sign({_id:user._id},"YashPadiyar4",{expiresIn:"1d"})
    return token
}
userSchema.methods.validatePassword=async function(password){
    const user=this
    const isPasswordCorrect=await bcrypt.compare(password,user.password)
    return isPasswordCorrect
}
const User=mongoose.model("User",userSchema)
module.exports=User;