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
        const errorMessages = result.error.errors.map(err => err.message);
        const formattedErrorMessage = errorMessages.join('\n');
        res.status(411).json({
            "message":formattedErrorMessage
        })
        return
    }
    
    const existingSeller=await Seller.find({phoneNumber:payload.phoneNumber})
    

    if(existingSeller.length>0){
        res.status(411).json({
            "message":"seller already exists"
        })
        return
    }

    await Seller.create({
        phoneNumber:payload.phoneNumber,
        password:payload.password,
        shopName:payload.shopName,
        imgUrl:payload.imgUrl,
        description:payload.description
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
        res.status(411).json({
            "message":"invalid Credentials"
        })
        return
    }

    const existingSeller =await  Seller.findOne({
        phoneNumber:payload.phoneNumber,
        password:payload.password
    })

    if(!existingSeller){
        res.status(411).json({
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

   
   const response=menuCheck.safeParse(payload);

   if(!response.success){
    res.status(411).json({
        "message":"Please fill correctly"
    })
    return
   }

   const seller=await Seller.findOne({
    "_id":UserId
   })

   if(!seller){
    res.status(411).json({
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

//menu get
router.get(('/item'),async(req,res)=>{ 
   const UserId=req.query.id
    const menu=await Menu.find({userId:UserId},'foodName price imgUrl')
    res.send(menu);
})



//get ShopName
router.get(('/shopname'),async (req,res)=>{
const shop=await Seller.find({},'shopName phoneNumber')
res.json(shop)

})

//filter
router.get('/filter', async (req, res) => {
    const filter = req.query.filter || "";

    const shops = await Seller.find({ shopName: { $regex: filter, $options: 'i' } });

    res.json(shops);
});

//get Resturant Details
router.get('/detail',async(req,res)=>{
    const UserId=req.query.id;
    const detail=await Seller.findOne({_id:UserId},'shopName phoneNumber')
   res.send(detail);

})


//update Image
router.post('/updateimg',middleware,async(req,res)=>{
    const img=req.body.img;

    const UserId=req.UserId;

    await Seller.updateOne(
        {_id:UserId},
        {
            $set:{
                imgUrl:img
        }
    }
    )
    res.status(411).json({
        "message":"Image updated"
    })
    

})

//update description
router.post('/updatedescription' ,async(req,res)=>{
    const description=req.body.description;

    const UserId=req.UserId;

    await Seller.updateOne(
        {_id:UserId},
        {
            $set:{
                description:description
        }
    }
    )
    res.status(411).json({
        "message":"Description updated"
    })
})

module.exports=router;