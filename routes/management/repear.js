const express=require('express');
const router=express.Router();
const passport=require('passport');
const repearcontroller=require('../../controlers/management/repear')

router.get('/',passport.authenticate('jwt',{ session: false }),repearcontroller.getAll);
router.patch('/:id',passport.authenticate('jwt',{ session: false }),repearcontroller.getByIdUpdate);
router.get('/:id',passport.authenticate('jwt',{ session: false }), repearcontroller.getById);

module.exports=router