const zod=require('zod');

const userSignup=zod.object({
    email:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.any(),
    mobileNumber:zod.number()
})

const userSignin=zod.object({
    email:zod.string().email(),
    password:zod.any()

})

const sellerSignup=zod.object({
    phoneNumber:zod.number(),
    shopName:zod.string(),
    password:zod.any()
})

const sellerSignin=zod.object({
    phoneNumber:zod.number(),
    password:zod.any()
})

const menuCheck=zod.object({
    foodName:zod.string(),
    price:zod.number(),
    imgUrl:zod.string()
})

module.exports={
    userSignup,userSignin,sellerSignup,sellerSignin,menuCheck
};