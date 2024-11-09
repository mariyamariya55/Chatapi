const {promisify}=require('util')

const AdminModel=require('../Models/user')

const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');

const signToken=id=>{

    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
}

module.exports.createadmin=async(req,res,next)=>{

    try{
        const {username,password}=req.body;
        if(!username || !password){
            return res.status(400).json({
                error:true,
                errorMessage:"Invalid credntials"
            });
        }
        const adminExists=await AdminModel.findOne({username})

        if(adminExists){
            return res.status(400).json({
                error:true,
                errorMessage:"Admin already exists"
            });
        }

        const hashedpassword=await bcrypt.hash(password,10);

        const newAdmin=await AdminModel.create({username,password:hashedpassword})
    
        return res.status(201).json({
            admin:{
                id:newAdmin._id,
                username:newAdmin.username,
            }
        });

    } catch(err){

        console.error(err);

        return res.status(500).json({

            error:true,
            errorMessage:"An error has occured.",
            message:err.message
        });
    }
}


module.exports.loginadmin = async (req, res,next)=>{
    try{
        const { username, password } = req.body;

       
        if (!username || !password) {
            return res.status(400).json({message:"Please provide username and password"})
        }

       
        const user = await AdminModel.findOne({username}) 
        if(!user || !(await user.correctPassword(password,user.password))) {
            return res.status(401).json({message:"Incorrect email and password"})
        }
        console.log(user );

      
        const token=signToken(user._id);
        res.status(200).json({
            status:'success',
            token
        })}
        catch (err) {
            console.log(err);
            return res.json({
                error: true,
                errorMessage: "An error has occurred.",
                message : err.message
            })}
        }
        module.exports.protect = async(req,res,next)=>{
            try{
            // 1) Getting token and check of it's there
          let token;
          if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
          ) 
          {
            token = req.headers.authorization.split(' ')[1];
          } 
          console.log(req.headers.authorization);
          if (!token) {
            return res.status(401).json({message:"You are not logged in!!! Please log in to get access"})
          }
        
         const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
         console.log(decoded);
        
          const currentUser = await AdminModel.findById(decoded.id);
        
       
          req.user = currentUser;
          next();
        
        }
        catch (err) {
            console.log(err);
            return res.json({
                error: true,
                errorMessage: "An error has occurred.",
                message: err.message
                
        })}}