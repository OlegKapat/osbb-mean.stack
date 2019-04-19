const express=require('express');
const router=express.Router();
const analiticscontroler=require('../../controlers/user/analitics');

 router.get('/hotwater',analiticscontroler.analiticsHotwater);
 router.get('/coolwater',analiticscontroler.analiticsCoolWater);
 router.get('/electrics',analiticscontroler.analiticaElectrica);
 router.get('/heating',analiticscontroler.analiticaHeating)
module.exports= router;