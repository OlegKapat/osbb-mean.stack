const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const moment=require('moment');

const voteSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    userId: [{type:String,
              require:true
    }],
    date:{
        type:String,
        default:()=>moment().format('DD.MM.YYYY')
    },
    numbervote:{
        type:Number
    }
})
module.exports=mongoose.model('voting',voteSchema)