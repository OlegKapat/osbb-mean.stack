const express=require('express');
const router=express.Router();
const passport=require('passport');
const votecontroler=require('../../controlers/management/vote');

router.post('/',passport.authenticate('jwt',{ session: false }), votecontroler.addVote);
router.get('/',votecontroler.getData);

module.exports=router;