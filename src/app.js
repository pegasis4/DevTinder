const express=require('express')
const {connectDB}=require("./config/database")
const User=require("./models/user")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const {userAuth}=require("./middlewares/auth")
const {getJWT}=require("./models/user")
const {validatePassword}=require("./models/user")

const app=express()

app.use(express.json()) 
app.use(cookieParser())

const profileRouter=require("./routes/profile")
const authRouter=require("./routes/auth")
const requestsRouter=require("./routes/requests")

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestsRouter)
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
