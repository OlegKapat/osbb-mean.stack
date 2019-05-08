var Formorder=require('../../models/user/formorder');
var errorHandler=require('../../utils/errorHandler');
var moment=require('moment');

module.exports.createOrder= async function(req,res){
    try{
        const neworder=await new Formorder({
            name:req.body.name,
            flat:req.body.flat,
            phone:req.body.phone,
            date:moment().format('DD.MM.YYYY'),
            userId:req.body.userId,
            description:req.body.description,
            specialist:req.body.specialist,
            cause:req.body.cause,
            status:req.body.status
        }).save()
        res.status(201).json(neworder)
      
        
    }
    catch(e){
        errorHandler(res,`Невірний формат вводу ${e}`)
    }
}