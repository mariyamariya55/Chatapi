const Router=require("express")
const router=Router()

router.post('/createMessage',require('../Controller/count').createMessage)
router.post('./getMessage',require('../Controller/usercoun').loginadmin)
router.post('./updateMessage',require('../Controller/count').updateMessage)
router.post('./deleteMessage',require('../Controller/count').deleteMessage)

module.exports=router;