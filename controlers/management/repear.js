const Repear=require('../../models/user/formorder');
const errorHandler=require('../../utils/errorHandler');

module.exports.getAll=async function(req,res){
    try{
        const data= await Repear.find()
        res.status(200).json(data)
    }
    catch(e){
        errorHandler(res,e)
    }
}
module.exports.getByIdUpdate=async function(req,res){
    try{
      const dataId=await Repear.findByIdAndUpdate(
          {_id:req.params.id},
          {$set:{cause:req.body.cause, status:req.body.status}},
          {new:true}
      )
      res.status(200).json(dataId)
    }
    catch(e){
        errorHandler(res,e)
    }
}
module.exports.getById=async function(req,res){
    try{
      const getId=await Repear.findById({_id:req.params.id})
      res.status(200).json(getId)
    }
    catch(e){
        errorHandler(res,e)
    }
}