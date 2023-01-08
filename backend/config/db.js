const mongoose=require('mongoose');

const connection=mongoose.connect('mongodb+srv://ankesh:ankeshkewat@cluster0.bdtrrli.mongodb.net/blog?retryWrites=true&w=majority')

module.exports={connection}