const express = require("express");
const { middleware } = require("../middleware");
const {User,Seller} =require("../db")

const router=express.Router();

router.post('',middleware,async(req,res)=>{
    const UserId=req.UserId;
    let user=await User.findOne({_id:UserId})
    if(!user){
        user=await  Seller.findOne({_id:UserId})
        if(!user){
            res.send(411).json({
                "message":"Please Login"
            })
            return
        }
        res.send("seller")
        return
    }
    res.send("user")
})

module.exports=router