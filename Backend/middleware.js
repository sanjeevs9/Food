const JWT_SECRET=require("./config");
const jwt=require('jsonwebtoken')

const middleware=((req,res,next)=>{
    const response=req.headers.authorization;
    console.log(response)
        
    if(!response || !response.startsWith('Bearer')){
        res.status(403).json({
            message:"Please Login or Create Your account"
        });
        return;
    }

    const token=response.split(' ')[1];
    const decoded=jwt.verify(token,JWT_SECRET);
    if(!decoded){
        res.status(403).json({
            message:"Please Login or Create Your account"
        });
        return
    }

    req.UserId=decoded.UserId;
    next();


})

module.exports = {
    middleware
}