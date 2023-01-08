const mongoose=require('mongoose');

const UserModel=mongoose.model('user',mongoose.Schema({
    email:String,
    password:String
}))

module.exports={UserModel}