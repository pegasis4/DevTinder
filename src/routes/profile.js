const express=require("express")
const profileRouter=express.Router()
const { userAuth } = require("../middlewares/auth")
const { validateEditProfileData } = require("../utils/validation")
const validator=require("validator")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")

const app=express()
app.use(express.json())
app.use(cookieParser())
profileRouter.get("/profile/view",userAuth,async (req,res)=>{
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
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try { 
       if (!validateEditProfileData(req)) {
           throw new Error("Not allowed field change request");
       }
       const loggedInUser = req.user;
       console.log(loggedInUser)
       Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
       console.log(loggedInUser)
       await loggedInUser.save()
       res.send("profile edited sucessfully");
    } catch (err) {
        res.status(400).send({ message: "Something went wrong", error: err.message });
    }
});

profileRouter.patch("/profile/forgotPassword", userAuth, async (req, res) => {
    try { 
       const {password}=req.body
       const user=req.user;
       if(!validator.isStrongPassword(password)){
        throw new Error("Weak Password")
       }
       const hashedPassword=await bcrypt.hash(password,10)
       user.password=hashedPassword
       await user.save()
       res.send("Password updated successfully")
    } catch (err) {
        res.status(400).send({ message: "Something went wrong", error: err.message });
    }
});

module.exports = profileRouter;
