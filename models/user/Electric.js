var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const moment=require('moment');

const electricSchema=new Schema({
    previous:{
        type:Number,
        require:true
    },
    current:{
        type:Number,
        require:true
    },
    diference:{
        type:Number,
        require:true
    },
    date:{
        type:String,
        default:() => moment().format("MM.DD.YYYY")
    },
    userId:{
        ref:'userauth',
        type:Schema.Types.ObjectId
    }

})
module.exports=mongoose.model('electric',electricSchema)