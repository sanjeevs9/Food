const express = require('express');
const {Seller,Bank} =require('../db')
const jwt =require('jsonwebtoken')
const {sellerSignup,sellerSignin} = require('../zod');
const { route } = require('./user');


const router = express.Router();

//create Seller acc
router.post('/create',async (req,res)=>{
    const payload=req.body;
    
    const result=sellerSignup.safeParse(payload);
    
    if(!result.success){
        res.json({
            "message":"please fill details correctly"
        })
        return
    }
    
    const existingSeller=await Seller.find({phoneNumber:payload.phoneNumber})
    

    if(existingSeller.length>0){
        res.json({
            "message":"seller already exists"
        })
        return
    }

    await Seller.create({
        phoneNumber:payload.phoneNumber,
        password:payload.password,
        shopName:payload.shopName
    })

    const seller=await Seller.findOne({
        phoneNumber:payload.phoneNumber
    })
   

    const SellerId=seller._id;
    const token=jwt.sign({SellerId},"fn")
    

    await Bank.create({
        userId:SellerId,
        balance:0
    })

    res.json({
        "message":"Account created",
        "token":token
    })

})

//Seller login
router.post('/signin',async(req,res)=>{
    const payload=req.body;
    const result=sellerSignin.safeParse(payload)

    if(!result.success){
        res.json({
            "message":"invalid Credentials"
        })
        return
    }

    const existingSeller =await  Seller.findOne({
        phoneNumber:payload.phoneNumber,
        password:payload.password
    })

    if(!existingSeller){
        res.json({
            "message":"seller not found"
        })
        return
    }

    const seller=await Seller.findOne({
        phoneNumber:payload.phoneNumber
    })

    const SellerId=seller._id;
    const token=jwt.sign({SellerId},"fn")
  

    res.json({
        "message":"Successfully logined",
        "token":token
    })

})

//menu create
router.post('menu',async(req,res)=>{
    
})

module.exports=router;