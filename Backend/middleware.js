const JWT_SECRET=require("./config");
const jwt=require('jsonwebtoken')

const middleware=((req,res,next)=>{
    const response=req.headers.authorization;

    if(!response || !response.startsWith('Bearer')){
        res.sendStatus(403);
        return;
    }

    const token=response.split(' ')[1];
    const decoded=jwt.verify(token,JWT_SECRET);
    if(!decoded){
        res.sendStatus(403);
        return
    }
    req.UserId=decoded.UserId;
    next();


})
module.exports = {
    middleware
}