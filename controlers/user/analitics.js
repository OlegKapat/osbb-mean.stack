const HotWater=require('../../models/user/hotwater');
 const Coolwater=require('../../models/user/coolwater');
 const Heating=require('../../models/user/heating');
 const Electric=require('../../models/user/electric');
 const errorHandler=require('../../utils/errorHandler');
 const moment=require('moment');

module.exports.analiticsHotwater= async function(req,res){
    try{
        const allOrders=await HotWater.find(req.body.userId).sort({date:1});
        if(allOrders){
            res.status(200).json(allOrders)
        }
    }
    catch(e){
            errorHandler(res,`Щось не так ${e}`) 
    }
}

module.exports.analiticsCoolWater=async function(req,res){
    try{
         const allData=await Coolwater.find(req.body.userId).sort({date:1});
         if(allData){
             res.status(200).json(allData)
         }   
    }
    catch(e){
        errorHandler(res,e)
    }
}

module.exports.analiticaElectrica=async function(req,res){
    try{
        const allData=await Electric.find(req.body.userId).sort({date:1})
    if(allData){
        res.status(200).json(allData)
       }
    } catch(e){
        errorHandler(res,e)
    }
    
}
module.exports.analiticaHeating= async function(req,res){
    try{
        const allData=await Heating.find(req.body.userId).sort({date:1})
        if(allData){
          res.status(200).json(allData)
        }
    } catch(e){
        errorHandler(res,e)
    }
  
}
function getHotWaterMap(lists=[]){
    const hotwaterPerDays ={}
    lists.forEach(list=>{
        const writedate=moment(list.date).format('DD.MM.YYYY')
        if(writedate===moment().format('DD.MM.YYYY'))
        {
            return
        }
        if(!hotwaterPerDays[date]){
            hotwaterPerDays[date]=[]
        }
        hotwaterPerDays[date].push[list];
    })
    return hotwaterPerDays;
}

