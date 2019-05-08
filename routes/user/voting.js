const express=require('express');
const router=express.Router();
const votingcontroler=require('../../controlers/user/voting');
const passport=require('../../middleware/passport');

router.get('/',votingcontroler.getData);
router.patch('/:id',votingcontroler.update);
module.exports=router;