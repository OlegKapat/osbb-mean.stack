const News = require('../models/News');
const errorHandler=require('../utils/errorHandler');
const moment=require('moment')


module.exports.getAllNews= async function(req,res){
    try{
       const news= await News.find()
        res.status(200).json(news)
    } catch(e){
        errorHandler(res,e)
    }
       
}
module.exports.getNewsById= async function(req,res){
    try{
        const news= await News.findById(req.params.id)

        res.status(200).json({news})
    } catch(e){
        errorHandler(res,e)
    }
       
}
module.exports.deleteAllNews= async function(req,res){
    try{
        await News.delete()
        res.status(200).json({
            message:"Вси записи видалени"
    })
    } catch(e){
        
    }
       
}
module.exports.deleteNewsById = async function(req,res){
    try{
        await News.remove({_id:req.params.id})
        res.status(200).json({
            message:"Статья удалена"
    })
    } catch(e){
        
    }
       
}
module.exports.updateNewsById= async function(req,res){
    try{
        const news=await News.findOneAndUpdate(
            {_id:req.params.id},// пошук по ключу що миняэмо
            {$set:req.body},// записуэмо змини
            {new:true}// пидтвержуэмо змини обновить запис в монгуси
        )
        res.status(200).json(news)
    } catch(e){
        errorHandler(res,e)
    }
       
}
module.exports.createNews= async function(req,res){
   
    try{
        const news= await new News({
            headarticle:req.body.headarticle,
            bodyarticle:req.body.bodyarticle,
            imageSrc:req.file ? req.file.path :'' ,
            date:moment().format('DDMMYYY') 
        }).save()
       
        res.status(201).json(news)
    } catch(e){
        errorHandler(res,e)
    }
       
}
