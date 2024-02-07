const mongoose = require('mongoose');
const { number } = require('zod');
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

    const bankSchema=new mongoose.Schema({
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
        },
        balance:{
          type:Number,
          required:true
        }
    })

    const studentSchema=new mongoose.Schema({
      email:{
        type:String,
        required:true,
        unique:true
      }
    })

    const sellerSchema=new mongoose.Schema({
      phoneNumber:{
        type:Number,
        required:true,
        trim:true
        },
        shopName:{
          type:String,
          required:true
        },
        password:{
          type:String,
          required:true,
        }

    })

    const menuSchema=new mongoose.Schema({
      foodName:{
        type:String,
        required:true
      },
      price:{
        type:number,
        required:true
      }
    })

    const User=mongoose.model('User',userSchema);
    const Bank=mongoose.model('Bank',bankSchema);
    const Student=mongoose.model('Student',studentSchema);
    const Seller=mongoose.model('Seller',sellerSchema);
    const Menu=mongoose.model('Menu',menuSchema);

    module.exports={
      User,Bank,Student,Seller,Menu
    };