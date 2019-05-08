const Electric=require('../../models/user/electric');
const errorHandler=require('../../utils/errorHandler');
const moment=require('moment');

module.exports.getAlldata= async function(req,res){
        try{
            const electricdata=await Electric.find({userId:req.body.userId}).sort({date:1})
            if(electricdata){
                res.status(200).json(electricdata)
            }
            else{
                console.log(res.error)
            }
        }
        catch(e){
            errorHandler(res,e)
        }
}
module.exports.sendData=async function(req,res){
    try{
        const electric= await new Electric({
            previous:req.body.previous,
            current:req.body.current,
            diference:req.body.diference,
            date:moment().format("MM.DD.YYYY"),
            userId:req.body.userId
        }).save()
        res.status(201).json(electric)
    }
    catch(e){
        errorHandler(res,e)
    }
}