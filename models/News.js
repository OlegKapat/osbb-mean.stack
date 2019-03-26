const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const moment=require('moment');

const newsSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    imageSrc:{
        type:String,
        default:''
    },
    date:{
        type:Date,
        timestamps: true,
        default:Date.now
    }

})
module.exports=mongoose.model('news',newsSchema,)