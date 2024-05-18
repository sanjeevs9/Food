const mongoose = require('mongoose');
require('dotenv').config()

await mongoose.connect( `mongodb+srv://${process.env.MONGO_URI}`,{
  bufferCommands: false,
  connectTimeoutMS: 30000
});

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
        },
        imgUrl:{
          type:String
        },
        description:{
          type:String
        }

    })

    const menuSchema=new mongoose.Schema({
      foodName:{
        type:String,
        required:true
      },
      price:{
        type:Number,
        required:true
      },
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Seller',
        required:true
      },
      imgUrl:{
        type:String
      }
    })


    const orderSchema = new mongoose.Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
      },
      status:{
        type:String,
        required:true
      },
      cost:{
        type:Number,
        required:true
      },
      name:{
      type:String,
      required:true
      },
      items: [{
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        cost: {
          type: Number,
          required: true
        },
        imageUrl: {
          type: String,
        }
      }]
    },{timestamps:true});

    orderSchema.pre('save', function(next) {
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
      this.createdAt = new Date(now.getTime() + istOffset);
      this.updatedAt = new Date(now.getTime() + istOffset);
      next();
    });

    const User=mongoose.model('User',userSchema);
    const Bank=mongoose.model('Bank',bankSchema);
    const Student=mongoose.model('Student',studentSchema);
    const Seller=mongoose.model('Seller',sellerSchema);
    const Menu=mongoose.model('Menu',menuSchema);
    const Order=mongoose.model('Order',orderSchema);

    module.exports={
      User,Bank,Student,Seller,Menu,Order
    };