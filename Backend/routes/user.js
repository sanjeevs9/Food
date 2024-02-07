
const express = require('express');
const {User,Bank} =require('../db')
const jwt=require('jsonwebtoken')
const {userSignup, userSignin} =require('../zod'); 

const router = express.Router();


//signup
router.post('/signup',async (req,res)=>{
    const payload=req.body;
     const response=userSignup.safeParse(payload);
     
     if(!response){
        res.json({
            "message":"please fill details correctly"
        })
        return
     }
    
    // const student=await User.find({email:payload.email})

    // if(student.length<=0){
    //     res.json({
    //         "message":"Please enter a valid email"
    //     })
    //     return
    //  }

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

    const user=User.findOne({
        email:payload.email
    })

    const UserId=user._id;
    const token=jwt.sign({UserId},"fn");

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
    
    const response=userSignin.safeParse(payload);
    if(!response){
        res.json({
            "message":"Invalid credentials"
           
        })
        return
    }

    const existingUser=await User.find({email:payload.email})
    if(existingUser.length<0){
        res.json({
            "message":"user not found"
        })
        return
    }

    const user=await User.findOne({
        email:payload.email
    })

    const UserId=user._id;
    const token=jwt.sign({UserId},"fn");
    
    res.json({
        "message":"Successfully Login",
        "token":token
    })

    

})




module.exports = router;