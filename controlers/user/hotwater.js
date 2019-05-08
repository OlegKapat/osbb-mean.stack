const HotWater=require('../../models/user/hotwater');
const errorHandler=require('../../utils/errorHandler');
const moment=require('moment');


module.exports.getAll=async function (req,res) {
    try{
        const hotwater= await HotWater.find({userId:req.body.userId}).sort({date:1})
        if(hotwater){
            res.status(200).json(hotwater)
        }
        else{
            console.log(res.error); 
        }
    }
    catch(e){
         errorHandler(res,e)   
    }
}


module.exports.sendData=async function (req,res) {
    try{
        const hotwater= await new HotWater({
            previous:req.body.previous,
            current:req.body.current,
            diference:req.body.diference,
            date:moment().format("MM.DD.YYYY"),
            userId:req.body.userId
        }).save()
        res.status(201).json(hotwater)

    } catch(e){
        errorHandler(res,e)
    }
   
}