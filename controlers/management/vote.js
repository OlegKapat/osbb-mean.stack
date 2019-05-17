const Vote=require('../../models/manager/vote');
const errorHandler=require('../../utils/errorHandler');
const moment=require('moment');

module.exports.addVote= async function(req,res){
    try{
        const vote= await new Vote({
            title:req.body.title,
            userId:req.body.userId,
            date:moment().format('DD.MM.YYYY'),
            numbervote:req.body.numbervote
        }).save()
        res.status(201).json(vote)
    }
    catch(e){
        errorHandler(res,e)
    }
}
// module.exports.update=async function(req,res){
//     const user=await Vote.find(req.body.id)
//     if(user){
//     try{
//         const vote=await Vote.findByIdAndUpdate({_id:req.body.id},
//                                                 {$set:req.body},
//                                                 {$set:numbervote+1},
//                                                 {new:true} )
//             res.status(200).json(vote)
//     }
//     catch(e){
//         errorHandler(res,e)
//     }
// }
// else 
//      res.status(404).json({
//          message:"Ви проголосували по цьому питанню."
//      })
// }
module.exports.getData= async function(req,res){
    try{
    const data= await Vote.find()
    res.status(200).json(data)
    }
    catch(e){
        errorHandler(res,e)
    }
}
module.exports.updateVote=async function(req,res){
    try{
       const updateVote=await Vote.findOneAndUpdate(
            {_id:req.params.id},
            {$set:{title:req.body.title}},
            {new:true}
       )
       res.status(200).json(updateVote)
      
    }
    catch(e){
        errorHandler(res,e)
    }
}
module.exports.deleteVote=async function(req,res){
    try{
        await Vote.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({
            message:"Питання виделено"
        })
        
    }
    catch(e){
        errorHandler(res,e)
    }
}

