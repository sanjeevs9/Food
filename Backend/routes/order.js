const { middleware } = require("../middleware");
const {Order,Seller, User}=require("../db")
const express =require("express");


const router =express.Router();

//create order
router.post('/create',middleware,async(req,res)=>{
    const UserId=req.UserId;
    const payload=req.body;
    // console.log(payload)
    
    try {
        const seller = await Seller.findOne({ _id: payload.sellerId });
        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }
        const order = await Order.create({
            userId: UserId,
            sellerId: seller._id,
            items: payload.items,
            cost:payload.cost,
            status:payload.status,
            name:payload.name
        });
        res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//get User order
router.get('/get',middleware,async(req,res)=>{
    const UserId=req.UserId;
   
    const list=await Order.find(
        {userId:UserId},
        "_id status cost createdAt items"
    )

    res.json({
        list
    })
})

//get seller order 
router.get('/sget',middleware,async(req,res)=>{
    const UserId=req.UserId;

    const list=await Order.find(
        {sellerId:UserId},
        "_id status cost createdAt items userId name"
    )
    res.json({
        list
    })
})

//update status
router.put('/put',async (req,res)=>{
    const orderId=req.body.id;
    const status=req.body.status;

    const order=await Order.updateOne(
        {_id:orderId},
        { $set:{status:status}}
    )
    console.log(order)
})



module.exports=router;

