const mongoose=require('mongoose');
var Schema=mongoose.Schema;
var moment=require('moment');

const troubleSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    flat:{
        type:Number,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:()=>moment().format("DD.MM.YYYY")
    },
    userId:{
        ref:'userauth',
        type:Schema.Types.ObjectId
    },
    specialist:{
        type:String
    },
    description:{
        type:String
    },
    cause:{
        type:String
    },
    status:{
        type:Boolean
    }

})
module.exports=mongoose.model('trouble',troubleSchema)