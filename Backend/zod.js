const zod=require('zod');

const userSignup=zod.object({
    email:zod
    .string({required_error:"email is required"})
    .email({message:"Use sharda mail to signup"}),

    firstName:zod
    .string({required_error:"FirstName is required"})
    .min(1,{message:"Please fill firstName"}),

    lastName:zod
    .string({required_error:"LastName is required"})
    .min(1,{message:"please fill lastName"}),

    password:zod
    .string({required_error:"Password is required"})
    .min(5,{message:"Min 5 letters for password"}),

    mobileNumber:zod
    .number({required_error:"This feild must be in number"})
    .refine(num=>num>=1000,{
        message: 'Phone number must be at least 4 digits long',
    })
})

const userSignin=zod.object({
    email:zod
    .string({required_error:"email is required"})
    .email({message:"inValid email"}),

    password:zod
    .string({required_error:"email is required"})

})

const sellerSignup=zod.object({
    phoneNumber: zod
    .number({required_error:"Number is required"})
    .refine(num => num >= 1000, {
        message: 'Phone number must be at least 4 digits long',
      }),

    shopName:zod
    .string({required_error:"email is required"})
    .min(4, {message:'Shop name must be at least 4 characters long'}),

    password:zod
    .string({required_error:"password is required"})
    .min(4,'password of length 4 is required'),

    description:zod
    .string({required_error:"email is required"})
    .min(4,{message:"description is requried"}),

    imgUrl: zod.string().url().optional()
})

const sellerSignin=zod.object({
    phoneNumber:zod
    .number({required_error:"Number is required"}),
    password:zod
    .string({required_error:"password is required"})
})

const menuCheck=zod.object({
    foodName:zod
    .string({required_error:"FoodName is required"})
    .min(2,{message:"Minimum 2 characters"}),
    price:zod.number({required_error:"price is required"}),
    imgUrl:zod.string()
})

module.exports={
    userSignup,userSignin,sellerSignup,sellerSignin,menuCheck
};