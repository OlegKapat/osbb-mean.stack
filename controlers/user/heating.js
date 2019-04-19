const Heating=require('../../models/user/heating');
const errorHandler=require('../../utils/errorHandler');
const moment=require('moment');

module.exports.getAll= async function(req,res){
    try{
        const heating=await Heating.find(req.body.userId)
        if(heating){
            res.status(200).json(heating)
        }
        else{
            console.log(res.error);
            
        }
    }
    catch(e){
        errorHandler(res,e)
    }
}

module.exports.sendData= async function(req,res){
     try{
        const heating=new Heating({
            previous:req.body.previous,
            current:req.body.current,
            diference:req.body.diference,
            date:moment().format("MM.DD.YYYY"),
            userId:req.body.userId
        }).save()
        res.status(201).json(heating)
     }
     catch(e){
        errorHandler(res,e)
     }
}