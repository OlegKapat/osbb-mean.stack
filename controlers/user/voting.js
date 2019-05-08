const Voting=require('../../models/manager/vote');
const errorHandler=require('../../utils/errorHandler');


module.exports.update=async function(req,res){
    // const updated={
    //     numbervote:req.body.newnumber,
    //     userId:req.params.userId
    // }
    // if(req.file){
    //     updated.imageSrc=req.file.path
    // }
    try{
            const voting= await Voting.findByIdAndUpdate(
                {_id:req.params.id},
                {$set:{numbervote:req.body.numbervote,userId:req.body.arrayUsersId}},  
                {new:true}
            ) 
            console.log(req.url)
            res.status(200).json(voting);
    }
    catch(e){
        errorHandler(res,e)
    }

}

module.exports.getData= async function(req,res){
    try{
    const data= await Vote.find()
    res.status(200).json(data)
    }
    catch(e){
        errorHandler(res,e)
    }
}
module.exports.getById=async function(req,res){
    try{
        const data=await Vote.findById({_id:req.params.id});
        res.status(200).json(data)
    }
    catch(e){
        errorHandler(res,e)
    }
}