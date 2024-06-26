
const express = require('express');
const {User,Bank} =require('../db')
const jwt=require('jsonwebtoken')
const {userSignup, userSignin} =require('../zod'); 
const JWT_SECRET=require("../config");
const bcrypt = require("bcryptjs")
const {middleware}= require('../middleware');
const { default: mongoose } = require('mongoose');

const router = express.Router();

let otp="";
let tempUser={}

//signup
router.post('/signup',async (req,res)=>{
    const payload=req.body;

    try{
        await userSignup.parseAsync(payload)

     const existingUser=await User.findOne({email:payload.email})
  
     if(existingUser){
        res.status(409).json({
            message:"User already exists"
        })
        return
     }

     //BcryptJs
    //  const salt=await bcrypt.genSalt(10);
    //  const secure=await  bcrypt.hash(payload.password,salt)

    otp=""
    for (let i = 0; i < 4; i++) {
        otp += Math.floor(Math.random() * 10);
      }
      tempUser=payload;
      
      res.json({
        otp:otp,
        email:payload.email,
        name:payload.name
      })
    }
    catch (error){
       
        res.status(400).json({
            message:error.errors[0].message
        })
        return
    }
    
})

router.post('/verify',async(req,res)=>{{
    let OTP=req.body.otp;
    try{
        if(OTP!==otp){
            res.status(400).json({
                message:"Incorrect OTP"
            })
            return
        }
    
     const user = await User.create({
            email:tempUser.email,
            firstName:tempUser.firstName,
            lastName:tempUser.lastName,
            password:tempUser.password,
            mobileNumber:tempUser.mobileNumber
        })
    
        const UserId=user._id;
        const token=jwt.sign({UserId},JWT_SECRET);
   
    
        await Bank.create({
            userId:UserId,
            balance:0
        })
        
        res.json({
            message:"Account Created",
            token:token
        })
    
    }
    catch(error){
        res.status(500).json({
            message:"Server Issue"
        })
    }
   

}})

//login
router.post('/signin',async(req,res)=>{
    const payload=req.body;
    try{
    await userSignin.parseAsync(payload);
    

    const existingUser=await User.findOne({
        email:payload.email,
        password:payload.password
    })

    if(!existingUser){
        res.status(411).json({
            message:"Invalid Credentials"
        })
        return
    }

    const UserId=existingUser._id;
    const token=jwt.sign({UserId},JWT_SECRET);
    
    res.json({
        message:"Successfully Logined",
        token:token
    })
    }
    catch(error){
      
        res.status(400).json({
            message:error.errors[0].message
        })
        return
    }
    
})

//get user detail
router.get('/getUser',middleware, async (req,res)=>{
    try{
        const UserId=req.UserId;
    const user=await User.findOne({_id:UserId})
    if(user){
        res.send(user)

    }else{
        res.status(404).json({
            message:"User not found"
        })
        
    }
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            message:"server error"
        })
        
    }
    
})

//get user balance and seller balance
router.get('/balance',middleware,async(req,res)=>{
    try{
        const UserId=req.UserId;
    
    let money=await Bank.findOne(
        {userId:UserId},
        "balance"
    )
    if(!money){
        res.status(404).json({
            message:"User Not found"
        })
        return
    }
    
    let balance=money.balance/100;
    res.json({
        "balance":balance
    })
  
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            message:"Server error"
        })
    }
    
})

//add money for both seller and user for WALLET
router.put('/addmoney',middleware,async(req,res)=>{
    const UserId=req.UserId;
    let money=req.body.money;
  
    let newMoney=(Number)(money)*100;

    await Bank.updateOne(
        {userId:UserId},
        {
            $inc:{
                balance:  newMoney
            }
        }
    )
    res.json({
        "message":`You succesfully added Rs${money}`
    })
})


//transaction 
router.post('/transaction',middleware,async(req,res)=>{
    const session =await mongoose.startSession()
    session.startTransaction();

    const UserId=req.UserId;
    const sellerId=req.body.id;

    let total=req.body.total;

    const user=await Bank.findOne(
        {userId:UserId}).session(session);

    let balance=user.balance/100;

    if(balance<total){
        await session.abortTransaction();
        res.status(400).json({
            "message":"Insufficient Balance"
        })
        return
    }
    total=total*100;
    await Bank.updateOne(
        {userId:UserId},
        {
            $inc:{
                balance: -total
            }
        }
    ).session(session);

    await Bank.updateOne(
        {userId:sellerId},
        {
            $inc:{
                balance: +total
            }
        }
    ).session(session)

    await session.commitTransaction();
    res.json({
        "message":"Tansfer Successful"
    })

    

})


module.exports = router;