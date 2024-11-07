const adminAuth=(req,res,next)=>{
    const adminpw="yash"
    const isrealadmin=(adminpw==="yash")
    if(isrealadmin){
        next()
    }
    else{
        res.send("unauthorized access")
    }

}
module.exports={
    adminAuth
}