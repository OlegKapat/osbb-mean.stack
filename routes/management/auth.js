const express=require('express');
const router=express.Router();
const managercontroler=require('../../controlers/management/auth');

router.post('/login',managercontroler.login);
router.post('/register',managercontroler.register)
module.exports=router
