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
            message:"Вси записи видалені"
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
    const updated={
        title:req.body.title,
        body:req.body.body
    }
    if(req.file)
    {
        updated.imageSrc=req.file.path;
    }
    try{
        debugger
        const news=await News.findOneAndUpdate(
            {_id:req.params.id},// пошук по ключу що міняємо
            {$set:req.body},// записуэмо зміни
            {new:true}// підтвержуэмо зміни обновить запис в монгуси
        )
        res.status(200).json(news)
    } catch(e){
        errorHandler(res,e)
    }
       
}
module.exports.createNews= async function(req,res){
   
    try{
        const news= await new News({
            title:req.body.title,
            body:req.body.body,
            imageSrc:req.file ? req.file.path :'' ,
            date:Date.now()
        }).save()
       
        res.status(201).json(news)
    } catch(e){
        errorHandler(res,e)
    }
       
}
