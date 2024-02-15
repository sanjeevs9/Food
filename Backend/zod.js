const zod=require('zod');

const userSignup=zod.object({
    email:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(4),
    mobileNumber:zod.number().refine(num=>num>=1000,{
        message: 'Phone number must be at least 4 digits long',
    })
})

const userSignin=zod.object({
    email:zod.string().email(),
    password:zod.string()

})

const sellerSignup=zod.object({
    phoneNumber: zod.number().refine(num => num >= 1000, {
        message: 'Phone number must be at least 4 digits long',
      }),
    shopName:zod.string().min(4, 'Shop name must be at least 4 characters long'),
    password:zod.string().min(4,'password of length 4 is required'),
    description:zod.string(),
    imgUrl:zod.string()
})

const sellerSignin=zod.object({
    phoneNumber:zod.number(),
    password:zod.any()
})

const menuCheck=zod.object({
    foodName:zod.string().min(2),
    price:zod.number(),
    imgUrl:zod.string()
})

module.exports={
    userSignup,userSignin,sellerSignup,sellerSignin,menuCheck
};