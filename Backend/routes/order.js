const { middleware } = require("../middleware");
const {Order,Seller}=require("../db")
const express =require("express");


const router =express.Router();

router.post('/create',middleware,async(req,res)=>{
    const UserId=req.UserId;
    const payload=req.body;
    console.log(payload)
    console.log(UserId);
    
    try {
        const seller = await Seller.findOne({ _id: payload.sellerId });
        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }
      

        const order = await Order.create({
            userId: UserId,
            sellerId: seller._id,
            items: payload.items,
            
        });

        

        res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    
})



module.exports=router;

