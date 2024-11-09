const mongoose=require('mongoose')

const messageSchema=new mongoose.Schema({
    sender:{type:String,required:true},
    reciever:{type:String,required:true},
    content:{type:String,required:true},
    imageUrl:{type:String},
    timestamp:{type:Date,default:Date.now}
});

const timeChat=mongoose.model('Meassage',messageSchema)
module.exports=timeChat;