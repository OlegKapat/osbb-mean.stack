var express=require('express');
var router=express.Router();
var heatingcontroler=require('../../controlers/user/heating');
const passport=require('passport')

router.post ('/get/',passport.authenticate('jwt',{ session: false }),heatingcontroler.getAll);
router.post('/add/',passport.authenticate('jwt',{ session: false }),heatingcontroler.sendData);

module.exports=router;