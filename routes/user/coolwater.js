const express=require('express');
const router=express.Router();
const coolwatercontroler=require('../../controlers/user/coolwater');
const passport=require('passport')


router.post ('/get/',passport.authenticate('jwt',{ session: false }),coolwatercontroler.getAlldata);
router.post('/add/',passport.authenticate('jwt',{ session: false }),coolwatercontroler.sendForm);
module.exports=router;