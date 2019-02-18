const express=require('express');
const router=express.Router();
const usercontroler=require('../../controlers/user/auth');

router.post('/login',usercontroler.login);
router.post('/register',usercontroler.register);
module.exports=router