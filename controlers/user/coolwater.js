const CoolWater=require('../../models/user/coolwater');
const errorHandler=require('../../utils/errorHandler');
const moment=require('moment')

module.exports.getAlldata=async function (req,res) {
    try{
        const coolwater= await CoolWater.find(req.body.userId)
        if(coolwater){
            res.status(200).json(coolwater)
        }
        else{
            console.log(res.error); 
        }
    }
    catch(e){
         errorHandler(res,e)   
    }
}

module.exports.sendForm=async function (req,res) {
    try{
        const coolwater= await new CoolWater({
            previous:req.body.previous,
            current:req.body.current,
            diference:req.body.diference,
            date:moment().format("MM.DD.YYYY"),
            userId:req.body.userId
        }).save()
        res.status(201).json(coolwater)

    } catch(e){
        errorHandler(res,e)
    }
   
}