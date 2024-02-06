const express = require('express');
const User = require('./user');
const Seller= require('./seller');


const router = express.Router();

router.use('/user', User);
// router.use('/seller', Seller);

module.exports=router;
