const express=require('express');
const router=express.Router();
const passport=require('passport')
const news=require('../controlers/news');
const upload=require('../middleware/upload')


router.get('/',passport.authenticate('jwt',{ session: false }), news.getAllNews);
router.get('/:id',passport.authenticate('jwt',{ session: false }),news.getNewsById);
router.delete('/',passport.authenticate('jwt',{ session: false }), news.deleteAllNews);
router.delete('/:id',passport.authenticate('jwt',{ session: false }), news.deleteNewsById);
router.post('/',upload.single('image'), passport.authenticate('jwt',{ session: false }),news.createNews);
router.patch('/:id',upload.single('image'),passport.authenticate('jwt',{ session: false }),news.updateNewsById);
module.exports=router