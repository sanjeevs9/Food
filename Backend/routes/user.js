
const express = require('express');
const {User} =require('../db')
const jwt=require('jsonwebtoken')
const {userSignup} =require('../zod'); 

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
    
    res.json({
        "message":"Account Created",
        "token":token
    })
    
})

//login
router.post('/signin',async(req,res)=>{
    const payload=req.body;


})




module.exports = router;