const express=require('express');
const router=express.Router();
const analiticscontroler=require('../../controlers/user/analitics');
const passport=require('passport')

 router.post('/hotwater',passport.authenticate('jwt',{ session: false }),analiticscontroler.analiticsHotwater);
 router.post('/coolwater',passport.authenticate('jwt',{ session: false }),analiticscontroler.analiticsCoolWater);
 router.post('/electrics',passport.authenticate('jwt',{ session: false }),analiticscontroler.analiticaElectrica);
 router.post('/heating',passport.authenticate('jwt',{ session: false }),analiticscontroler.analiticaHeating)
module.exports= router;