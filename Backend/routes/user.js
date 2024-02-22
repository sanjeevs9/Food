
const express = require('express');
const {User,Bank,Student} =require('../db')
const jwt=require('jsonwebtoken')
const {userSignup, userSignin} =require('../zod'); 
const JWT_SECRET=require("../config");
const bcrypt = require("bcryptjs")
const {middleware}= require('../middleware');
const { default: mongoose } = require('mongoose');

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

//get user balance and seller balance
router.get('/balance',middleware,async(req,res)=>{
    const UserId=req.UserId;
    
    let money=await Bank.findOne(
        {userId:UserId},
        "balance"
    )
    
    let balance=money.balance/100;
    res.json({
        "balance":balance
    })
    console.log(balance)
})

//add money for both seller and user for WALLET
router.put('/addmoney',middleware,async(req,res)=>{
    const UserId=req.UserId;
    let money=req.body.money;
    console.log(money)
    console.log(UserId)
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
    console.log(sellerId)
    let total=req.body.total;

    const user=await Bank.findOne(
        {userId:UserId}).session(session);

    let balance=user.balance/100;

    if(balance<total){
        await session.abortTransaction();
        res.status(400).json({
            "message":"Insufficient Solution"
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