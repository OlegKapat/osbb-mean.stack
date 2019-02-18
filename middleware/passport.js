const JwtStrategy=require('passport-jwt').Strategy
const ExtractJwt=require('passport-jwt').ExtractJwt
const mongoose=require('mongoose')
const Userauth=mongoose.model('userauth')
const keys=require('../config/keys')
const Managerauth=mongoose.model('managerauth')

const options={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:keys.jwt
}

module.exports=passport=>{
    passport.use(
        new JwtStrategy(options,async(payload,done)=>{
            try{
                const userauth=await Userauth.findById(payload.userauthId).select('email id');
                const managerauth=await Managerauth.findById(payload.managerauthId).select('login id');
                if(userauth || managerauth){
                    return done(null, userauth || managerauth)
                }
                else{
                    return done(null, false)
                }
            }
            catch(e){
                    console.log(e);
                    
            }
           
        })
    )
}