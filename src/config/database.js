const mongoose=require('mongoose')
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://padiyaryash2019:yash2956@cluster0.qggj3lf.mongodb.net/devTinder")
}
module.exports={
    connectDB
}