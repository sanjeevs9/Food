const express = require('express');
const {Seller,Bank,Menu} =require('../db')
const jwt =require('jsonwebtoken')
const {sellerSignup,sellerSignin, menuCheck} = require('../zod');
const { route } = require('./user');
const JWT_SECRET=require("../config");
const {middleware}= require('../middleware')


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
   

    const UserId=seller._id;
    const token=jwt.sign({UserId},JWT_SECRET)
    

    await Bank.create({
        userId:UserId,
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

    const UserId=seller._id;
    const token=jwt.sign({UserId},JWT_SECRET)
  

    res.json({
        "message":"Successfully logined",
        "token":token
    })

})

//menu create
router.post('/menu', middleware, async (req, res) => {
   const UserId=req.UserId;
   const payload=req.body;

   console.log(UserId);
   console.log(payload);
   const response=menuCheck.safeParse(payload);

   if(!response.success){
    req.json({
        "message":"Please fill correctly"
    })
    return
   }

   const seller=await Seller.findOne({
    "_id":UserId
   })

   if(!seller){
    res.json({
        "message":"Seller Not found"
       
    })
    return
   }

   await Menu.create({
    userId:UserId,
    foodName:payload.foodName,
    price:payload.price,
    imgUrl:payload.imgUrl
})

res.json({
    "message":"Food Added"
})
});


//get ShopName
router.get(('/shopname'),async (req,res)=>{
const shop=await Seller.find({},'shopName phoneNumber')
res.json(shop)

})

module.exports=router;