const express = require("express");

const jwt = require("jsonwebtoken");
const { sellerSignup, sellerSignin, menuCheck, AdminUpdate } = require("../zod");
const { route } = require("./user");
const JWT_SECRET = require("../config");
const { middleware } = require("../middleware");
require("dotenv").config();

const accountSid = process.env.AccountSID;
const authToken = process.env.AUTHTOKEN;
const client = require("twilio")(accountSid, authToken);

const router = express.Router();
let otp = "";
let tempSeller = {};

//create Seller acc
router.post("/create", async (req, res) => {
  const payload = req.body;

  try{
    await sellerSignup.parseAsync(payload);

  const existingSeller = await Seller.findOne({
    phoneNumber: payload.phoneNumber,
  });

  if (existingSeller) {
    res.status(411).json({
      message: "seller already exists",
    });
    return;
  }

  otp = "";
  for (let i = 0; i < 4; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  //dummy otp json
  tempSeller = payload;
  res.json({
    message: "dummy otp(Type Any number to create)",
  });
  //   client.messages
  //     .create({
  //         body: `Your verification OTP is ${otp}`,
  //         from: '+14782237838',
  //         to: `+919523001333`
  //     })
  //     .then(response=>{
  //         res.json({
  //             "message":`OTP send on ${payload.phoneNumber}`
  //         })
  //     })
  //     .catch((error) => {
  //         console.error(error);
  //         res.status(500).json({
  //           "message": "Failed to send OTP"
  //         });
  //       })
  }
  catch(error){
  
        res.status(400).json({
            message:error.errors[0].message
        })
        return
  }
  
});

router.post("/verify", async (req, res) => {
  let OTP = req.body.otp;
  //dummy otp check
  OTP = otp;
  if (OTP !== otp) {
    res.status(411).json({
      message: "Wrong Otp",
    });
    return;
  }

  const seller=await Seller.create({
    phoneNumber: tempSeller.phoneNumber,
    password: tempSeller.password,
    shopName: tempSeller.shopName,
    imgUrl: tempSeller.imgUrl,
    description: tempSeller.description,
  });

  const UserId = seller._id;
  const token = jwt.sign({ UserId }, JWT_SECRET);

  await Bank.create({
    userId: UserId,
    balance: 0,
  });

  res.json({
    message: "Otp verified",
    token: token,
  });
});

//Seller login
router.post("/signin", async (req, res) => {
  const payload = req.body;

  try{
   await sellerSignin.parseAsync(payload);
  
    const existingSeller = await Seller.findOne({
      phoneNumber: payload.phoneNumber,
      password: payload.password,
    });
  
    if (!existingSeller) {
      res.status(411).json({
        message: "seller not found",
      });
      return;
    }
  
    const UserId = existingSeller._id;
    const token = jwt.sign({ UserId }, JWT_SECRET);
  
    res.json({
      message: "Successfully logined",
      token: token,
    });
  }
  catch(error){
  
    res.status(400).json({
        message:error.errors[0].message
    })
    return
  }
  
});

//menu create
router.post("/menu", middleware, async (req, res) => {
  const UserId = req.UserId;
  const payload = req.body;
  try{
    await menuCheck.parseAsync(payload);

  const seller = await Seller.findOne({
    _id: UserId,
  });

  if (!seller) {
    res.status(411).json({
      message: "Seller Not found",
    });
    return;
  }

 const menu= await Menu.create({
    userId: UserId,
    foodName: payload.foodName,
    price: payload.price,
    imgUrl: payload.imgUrl,
  });

  res.json({
    message: "Food Added",
    menu
  });
  }
  catch(error){
  
    res.status(400).json({
        message:error.errors[0].message
    })
    return
  }
  
});

//update menu

router.post("/updatemanu",middleware,async(req,res)=>{
  const UserId = req.UserId;
  const body =req.body;
  const id=req.headers.id
  try{
    await menuCheck.parseAsync(body)
 
    const seller=await Menu.updateMany({
        _id:id
    },{
      $set:{
        foodName:body.foodName,
        price:body.price,
        imgUrl:body.imgUrl
      }
    })

    res.json({
      message:"Updated"
    })
    
  }catch(error){

    res.status(400).json({
        message:error.errors[0].message
    })
    return
  }

})

//menu get on user interface
router.get("/item", async (req, res) => {
  const UserId = req.query.id;
  const menu = await Menu.find({ userId: UserId }, "foodName price imgUrl _id");
  res.send(menu);
});

//menu get on seller interface
router.get("/itemm", middleware, async (req, res) => {
  const UserId = req.UserId;
  const menu = await Menu.find({ userId: UserId }, "foodName price imgUrl");
  res.send(menu);
});

//get ShopName
router.get("/shopname", async (req, res) => {
  const shop = await Seller.find({}, "shopName phoneNumber");
  res.json(shop);
});

//filter
router.get("/filter", async (req, res) => {
  const filter = req.query.filter || "";

  const shops = await Seller.find({
    shopName: { $regex: filter, $options: "i" },
  });

  res.json(shops);
});

//get Resturant Details
router.get("/detail", async (req, res) => {
  const UserId = req.query.id;
  const detail = await Seller.findOne({ _id: UserId }, "shopName phoneNumber");
  res.send(detail);
});

//get resturant details for admin

router.get("/admin",middleware,async(req,res)=>{
  const userId=req.UserId;
  const detail=await Seller.findOne({_id:userId},"shopName phoneNumber imgUrl description");
  const balance=await Bank.findOne({userId:userId},"balance");
  return  res.json({
    detail,balance
  })
})

//update Image
router.post("/updateAdmin", middleware, async (req, res) => {
  const payload=req.body;
  const UserId = req.UserId;
  

 try{
  await AdminUpdate.parseAsync(payload)

  await Seller.updateOne(
    { _id: UserId },
    {
      $set: {
        imgUrl: payload.imgUrl,
        phoneNumber: payload.phoneNumber,
        shopName:payload.shopName,
        description:payload.description
      }
    }
  );
  return res.json({
    message: "details updated",
  });

 }catch(error){
      res.status(411).json({
        message:error.errors[0].message
      })
 }

  
  
});

//update description
router.post("/updatedescription", async (req, res) => {
  const description = req.body.description;

  const UserId = req.UserId;

  await Seller.updateOne(
    { _id: UserId },
    {
      $set: {
        description: description,
      },
    }
  );
  return res.json({
    message: "Description updated",
  });
});

module.exports = router;
