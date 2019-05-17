const express=require('express');
const router=express.Router();
const passport=require('passport');
const votecontroler=require('../../controlers/management/vote');

router.post('/',passport.authenticate('jwt',{ session: false }), votecontroler.addVote);
router.get('/',passport.authenticate('jwt',{ session: false }), votecontroler.getData);
router.patch('/:id',passport.authenticate('jwt',{ session: false }), votecontroler.updateVote);
router.delete('/:id',passport.authenticate('jwt',{ session: false }), votecontroler.deleteVote);

module.exports=router;