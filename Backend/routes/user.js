
const express = require('express');
const {User,Bank,Student} =require('../db')
const jwt=require('jsonwebtoken')
const {userSignup, userSignin} =require('../zod'); 
const JWT_SECRET=require("../config");
const bcrypt = require("bcryptjs")
const {middleware}= require('../middleware')

const router = express.Router();


//signup
router.post('/signup',async (req,res)=>{
    const payload=req.body;
  

    const result= userSignup.safeParse(payload)
    
    if(!result.success){
        const errorMessages=result.error.errors.map(err=>err.message);
        const formattedErrorMessage = errorMessages.join('\n');
        console.log(formattedErrorMessage);
        res.status(411).json({
            message: formattedErrorMessage
        })
        return
    }

    const student=await Student.find({email:payload.email})
   

    if(student.length===0){
        res.status(411).json({
            "message":"Please enter a valid email"
        })
        return
     }

     const existingUser=await User.find({email:payload.email})

     if(existingUser.length>0){
        res.status(411).json({
            "message":"User already exists"
        })
        return
     }

     //BcryptJs
    //  const salt=await bcrypt.genSalt(10);
    //  const secure=await  bcrypt.hash(payload.password,salt)
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
        res.status(411).json({
            message: "Error while logging in",     
        })
    
        return
    }

    const existingUser=await User.findOne({
        email:payload.email,
        password:payload.password
    })

    if(!existingUser){
        res.status(411).json({
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

//get user detail
router.get('/getUser',middleware, async (req,res)=>{
    const UserId=req.UserId;
    const user=await User.findOne({_id:UserId})
    if(user){
        res.send(user)

    }
})




module.exports = router;