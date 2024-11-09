const mongoose=require("mongoose")
const {Schema}=mongoose;

const bcrypt=require('bcryptjs')

const userSchema= new Schema({

    username:{
        type:String,
        required:true,
        uniqued:true
    },
    password:{
        type:String,
        required:true,
    }
});

userSchema.methods.correctPassword=async function(candidatePasword,userPassword){
    return await bcrypt.compare(candidatePasword,userPassword);

}  

module.exports=mongoose.model("chatuser",userSchema)