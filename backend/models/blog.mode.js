const mongoose=require('mongoose');

const BlogModel=mongoose.model('blogs',mongoose.Schema({
    title:String,
    content:String,
    id:String
}))

module.exports={BlogModel}