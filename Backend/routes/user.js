
const express = require('express');
const {User,Bank,Student} =require('../db')
const jwt=require('jsonwebtoken')
const {userSignup, userSignin} =require('../zod'); 
const JWT_SECRET=require("../config");

const router = express.Router();


//signup
router.post('/signup',async (req,res)=>{
    const payload=req.body;
    
    const result= userSignup.safeParse(payload)
    
    if(!result.success){
        res.json({
            "message":"invalid Inputs"
        })
        return
    }
    
    const student=await Student.find({email:payload.email})
   

    if(student.length===0){
        res.json({
            "message":"Please enter a valid email"
        })
        return
     }

     const existingUser=await User.find({email:payload.email})

     if(existingUser.length>0){
        res.json({
            "message":"User already exists"
        })
        return
     }
    await User.create({
        email:payload.email,
        firstName:payload.firstName,
        lastName:payload.lastName,
        password:payload.password,
        mobileNumber:payload.mobileNumber
    })

    const user=await User.findOne({
        email:payload.email
    })


    const UserId=user._id;
    const token=jwt.sign({UserId},JWT_SECRET);
    console.log(UserId);

    await Bank.create({
        userId:UserId,
        balance:0
    })
    
    res.json({
        "message":"Account Created",
        "token":token
    })
    
})

//login
router.post('/signin',async(req,res)=>{
    const payload=req.body;
    
    const result=userSignin.safeParse(payload);
    if(!result.success){
        res.json({
            "message":"Invalid inputs"
           
        })
        return
    }

    const existingUser=await User.findOne({
        email:payload.email,
        password:payload.password
    })

    if(!existingUser){
        res.json({
            "message":"Invalid Credentials"
        })
        return
    }

    const user=await User.findOne({
        email:payload.email
    })

    const UserId=user._id;
    const token=jwt.sign({UserId},JWT_SECRET);
    
    res.json({
        "message":"Successfully Logined",
        "token":token
    })
})




module.exports = router;