const express=require('express');
const router=express.Router();
const passport=require('passport')
const news=require('../controlers/news');
const upload=require('../middleware/upload')


router.get('/',passport.authenticate('jwt',{ session: false }), news.getAllNews);
router.get('/:id',passport.authenticate('jwt',{ session: false }),upload.single('image'), news.getNewsById);
router.delete('/',passport.authenticate('jwt',{ session: false }), news.deleteAllNews);
router.delete('/:id',passport.authenticate('jwt',{ session: false }), news.deleteNewsById);
router.post('/',passport.authenticate('jwt',{ session: false }), upload.single('image'), news.createNews);
router.patch('/:id',passport.authenticate('jwt',{ session: false }),upload.single('image'),news.updateNewsById);
module.exports=router