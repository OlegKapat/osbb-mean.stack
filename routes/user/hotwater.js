const express=require('express');
const router=express.Router();
const hotwatercontroler=require('../../controlers/user/hotwater');


router.get ('/',hotwatercontroler.getAll);
router.post('/',hotwatercontroler.sendData);
// router.get('/:id',hotwatercontroler.getOneId)
module.exports=router;