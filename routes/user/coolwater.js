const express=require('express');
const router=express.Router();
const coolwatercontroler=require('../../controlers/user/coolwater');


router.get ('/',coolwatercontroler.getAlldata);
router.post('/',coolwatercontroler.sendForm);
module.exports=router;