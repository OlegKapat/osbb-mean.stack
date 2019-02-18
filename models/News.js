const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const newsSchema=new Schema({
    headarticle:{
        type:String,
        required:true
    },
    bodyarticle:{
        type:String,
        required:true
    },
    imageSrc:{
        type:String,
        default:''
    },
    date:{
        type:Date,
        default:Date.now
    }

})
module.exports=mongoose.model('news',newsSchema,)