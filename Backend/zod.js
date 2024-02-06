const zod=require('zod');

const userSignup=zod.object({
    email:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.any()
})

module.exports={userSignup};