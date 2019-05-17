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
               token:`Bearer ${token}`,
               userId:candidate._id,
               userName:candidate.name
           }
           )
       }
       else{
           // Пароли не совпадают
            res.status(401).json({
                message:"Паролі не свівпадають спробуйте знову"
            })
       }
   }
   else{
       // Добавляем пользователя, такого нет
       res.status(404).json({
           message:"Користувача з таким email не знайдено"
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
module.exports.getUsers= async function(req,res){
    try{
        const allusers=await Userauth.find().sort({flat:1})
        if(allusers){
            res.status(200).json(allusers)
        }
        else{
          res.status(404).json({
              message:"Данні відсутні"
          })
        }
    }
    catch(e){
        errorHandler(res,e)
    }
}