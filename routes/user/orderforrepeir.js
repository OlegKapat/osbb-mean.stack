const express=require('express');
const router=express.Router();
const repeircontroler=require('../../controlers/user/troubleorder');
const passport=require('passport');

router.post('/',passport.authenticate('jwt',{ session: false }),repeircontroler.createOrder)
module.exports=router;