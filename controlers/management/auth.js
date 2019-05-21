const Managerauth=require('../../models/Managerauth');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const keys=require('../../config/keys');


module.exports.login= async function(req,res){
  const candidate= await Managerauth.findOne({
      login:req.body.login
  })
  
  if(candidate){
      // перевірка користувача
    const passwordResult=bcrypt.compareSync(req.body.password,candidate.password)
    
    if(passwordResult){
        // генерація токена паролі співпали
        const managertoken=jwt.sign({
            login:candidate.login,
            managerauthId:candidate._id
        }, keys.jwt,{expiresIn: 60 * 60})

        res.status(200).json({
            managertoken:`Bearer ${managertoken}`
        })

    }else{
        // Паролі не співпали спробуйте ще раз
        res.status(401).json({
            message:"Паролі не співпали"
        })
    }
  }
  else{
      res.status(404).json({
          message:"Такий користувач не знайдений"
      })
  }
}
module.exports.register= async function(req,res){
  const candidate= await Managerauth.findOne({login:req.body.login})
  if(candidate){
      res.status(409).json({message:"Користувач з наким логіном вже зареєстрований"})
  }
  else{
      const salt=bcrypt.genSaltSync(10);
      const password=req.body.password
      const manager=new Managerauth({
          name:req.body.name,
          position:req.body.position,
          login:req.body.login,
          password:bcrypt.hashSync(password,salt)
      })
      try{
        await manager.save()
        res.status(201).json(manager);
      }
      catch(e){
          // error придумати що робити
      }
      
  }
}