var express=require('express');
var router=express.Router();
var heatingcontroler=require('../../controlers/user/heating');

router.get ('/',heatingcontroler.getAll);
router.post('/',heatingcontroler.sendData);

module.exports=router;