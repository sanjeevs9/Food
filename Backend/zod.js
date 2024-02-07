const zod=require('zod');

const userSignup=zod.object({
    email:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.any(),
    phoneNumber:zod.number()
})

const userSignin=zod.object({
    email:zod.string().email(),
    password:zod.any()

})

module.exports={
    userSignup,userSignin
};