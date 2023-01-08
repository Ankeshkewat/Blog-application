const mongoose=require('mongoose');

const OtpModel=mongoose.model('otp',mongoose.Schema({
   otp:Number
}))

module.exports={OtpModel}