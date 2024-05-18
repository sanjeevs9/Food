const express = require('express');
const User = require('./user');
const Seller= require('./seller');
const local=require('./local');
const order=require('./order')

const router = express.Router();


router.use('/user', User);
router.use('/seller', Seller);
router.use('/local',local)
router.use('/order',order)
module.exports=router;
