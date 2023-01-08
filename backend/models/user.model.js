const mongoose=require('mongoose');

const UserModel=mongoose.model('user',mongoose.Schema({
    email:String,
    password:String,
    role:{type:"String",enum:['Writer','User','Admin'],default:'User'}
}))

module.exports={UserModel}