const express=require('express');
const router=express.Router();
const hotwatercontroler=require('../../controlers/user/hotwater');
const passport=require('passport');


router.post ('/get/',passport.authenticate('jwt',{ session: false }),hotwatercontroler.getAll);
router.post('/add/',passport.authenticate('jwt',{ session: false }),hotwatercontroler.sendData);
// router.get('/:id',hotwatercontroler.getOneId)
module.exports=router;