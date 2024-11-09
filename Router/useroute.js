const Router=require("express")
const router=Router();

router.post("/createadmin",require("../Controller/usercoun").createadmin)
router.post("/logianadmin",require("../Controller/usercoun").loginadmin)

module.exports=router