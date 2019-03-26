const multer=require('multer');
const moment=require('moment');

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'public/image/')
    },
    filename(req,file,cb){
        const date=moment().format('DDMMYYYY')
        cb(null,`${date}-${file.originalname}`)
    }
})
const filefilter=(red,file,cb)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpeg' || file.mimetype==='image/jpg'){
        cb(null,true)
    }else{
        cb(null,false)
    }
} //фильтр по типу зображень
const limits={
    filesize:1024*1024*5
} // обмеження по розмиру зображень
module.exports=multer({
    storage,
    filefilter,
    limits
})