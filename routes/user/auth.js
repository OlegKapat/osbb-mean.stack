const express=require('express');
const router=express.Router();
const usercontroler=require('../../controlers/user/auth');
const passport=require('passport')

router.post('/login',usercontroler.login);
router.post('/register',usercontroler.register);
router.get('/',usercontroler.getUsers)
module.exports=router