const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const managerSchema=new Schema({
    name:{
        type:String
        
    },
    position:{
        type:String,
        required:true
    },
    login:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
   
})

module.exports=mongoose.model('managerauth',managerSchema)