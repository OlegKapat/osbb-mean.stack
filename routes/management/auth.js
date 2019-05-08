const express=require('express');
const router=express.Router();
const managercontroler=require('../../controlers/management/auth');
const passport=require('passport')

router.post('/login',managercontroler.login);
router.post('/register',passport.authenticate('jwt',{ session: false }),managercontroler.register)
module.exports=router
