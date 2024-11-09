const MessageModel=require('../Models/model')


exports.getMessage=async(req,res)=>{

    try{

        const value=await MessageModel.find({
$or:[{sender:req.user.username},{receiver:req.username}],

        }).sort({timestamp:1});
        return res.status(200).json(value)
    } catch (err){
        console.log(err);
        
    }
};

exports.createMessage=async(req,res)=>{

    const {reciever,content,imageUrl}=req.body;
if(!reciever || ! content){
    return res.status(400).json({message:'Reciever and content are require'})
}

try{

    const value=new MessageModel({

        sender:req.user.username,
        reciever,
        content,
        imageUrl,
    });
    await value.save();
    return res.status(200).json(value)

} catch(err){
    console.log(err);
    return res.status(500).json({message:'Error updating message.'})
    
}
};

exports.updateMessage = async (req, res) => {
    const { messageId } = req.params;
    const { content, imageUrl } = req.body;
  
    try {
  
      const message = await MessageModel.findById(messageId);
  
      if (!message) {
        return res.status(404).json({ message: 'Message not found.' });
      }
  
   
      if (message.sender !== req.user.username) {
        return res.status(403).json({ message: 'You can only update your own messages.' });
      }
  
  
      message.content = content || message.content;
      message.imageUrl = imageUrl || message.imageUrl;
  
     
      await message.save();
      return res.status(200).json(message);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating message.' });
    }
  };

  exports.deleteMessage=async(req,res)=>{
    const {valueId}=req.params;
    try{

        const value=await MessageModel.findById(valueId);
        if(!value){
return res.status(404).json({message:"Message not found."})

        }
        if(value.sender !== req.user.username){
            return res.status(200).json({message:"Message deleted."})
        }
    } catch(err){
        console.error(err)
        return res.status(500).json({message:"Error deleting message."})
        
    }
  }

  