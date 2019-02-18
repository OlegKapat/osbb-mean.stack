const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const Userauth=require('../../models/Userauth');
const keys=require('../../config/keys');
const errorHandler=require('../../utils/errorHandler');

module.exports.login= async function(req,res){
   const candidate=await Userauth.findOne({email:req.body.email})
   if(candidate){
       // Проверяем пароль, такой уже есть 
       const passwordResult=bcrypt.compareSync(req.body.password,candidate.password)
       if(passwordResult){
           // Генерация токена, пароли совпали
           const token= jwt.sign({
               email:candidate.email,
               userauthId:candidate._id
           }, keys.jwt, { expiresIn: 60 * 60})
           res.status(200).json({
               token:`Bearer ${token}`
           })
       }
       else{
           // Пароли не совпадают
            res.status(401).json({
                message:"Пароли не совпадают, повторите ввод"
            })
       }
   }
   else{
       // Добавляем пользователя, такого нет
       res.status(404).json({
           message:"Пользователь с таким email не найден"
       })
   }
}
module.exports.register= async function(req,res){
   const candidate= await Userauth.findOne({email:req.body.email})
   if(candidate){
       // Пользователь существует возвращаем ошибку
       res.status(409).json({
           message:"Пользователь с таким email уже зарегестрирован"
       })
   }
   else{
       // Добавляем нового пользователя
       const salt = bcrypt.genSaltSync(10);
       const password=req.body.password;
       const userauth=new Userauth({
            name:req.body.name,
            flat:req.body.flat,
            email:req.body.email,
            password:bcrypt.hashSync(password,salt)
       })
       try{
        await userauth.save()
        res.status(201).json(userauth)
       }
       catch(e){
            errorHandler(res,e)
       }
       
   }
}