const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const morgan=require('morgan');
const passport=require('passport');
const path = require('path');
const authUserRoutes=require('./routes/user/auth');
const authManagementRoutes=require('./routes/management/auth');
const newsRoutes=require('./routes/news');
const keys=require('./config/keys')

mongoose.connect(keys.mongoURI,{useCreateIndex: true, useNewUrlParser: true }).then(()=> console.log("MongoDB connected")).
catch(error=>console.log("Occured error",error));
app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(express.static(path.join(__dirname,'public')));
app.use(morgan('dev'));
app.use(cors()); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api/userauth', authUserRoutes);
app.use('/api/managerauth', authManagementRoutes);
app.use('/api/news',newsRoutes);

module.exports=app;
