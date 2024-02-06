const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sanjeev:VH2cYQkXF178eBsE@cluster0.v8nr0x6.mongodb.net/food');

const userSchema=new mongoose.Schema({
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
    },
    password:{
      type:String,
      required:true,
      minlength:5,
    },
    firstName:{
        type:String,
        required:true,
        trim:true
        },
    lastName:{
        type:String,
        required:true,
        trim:true
        },
    mobileNumber:{
        type:Number,
        required:true,
        trim:true
        },

    })
    const User=mongoose.model('User',userSchema);
    module.exports={User};