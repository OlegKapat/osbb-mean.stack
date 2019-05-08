const express=require('express');
const router=express.Router();
const electricitycontroller=require('../../controlers/user/electric');
const passport=require('passport')

router.post('/get/',passport.authenticate('jwt',{ session: false }),electricitycontroller.getAlldata);
router.post('/add/',passport.authenticate('jwt',{ session: false }),electricitycontroller.sendData);

module.exports=router;