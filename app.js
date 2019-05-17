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
const hotwaterRoutes=require('./routes/user/hotwater');
const coolwaterRoutes=require('./routes/user/coolwater');
const electricityRoutes=require('./routes/user/electric');
const heatingRoutes=require('./routes/user/heating');
const orderforrepairRoutes=require('./routes/user/orderforrepeir');
const troubleRoutes=require('./routes/management/repear');
const analiticsRouters=require('./routes/user/analitics');
const voteRoutes=require('./routes/management/vote');
const votingRoutes=require('./routes/user/voting')
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
app.use('/api/hotwater',hotwaterRoutes);
app.use('/api/coolwater',coolwaterRoutes);
app.use('/api/electricity',electricityRoutes);
app.use('/api/centralheating',heatingRoutes);
app.use('/api/orderforrepair',orderforrepairRoutes);
app.use('/api/trouble',troubleRoutes)
app.use('/api/analitica',analiticsRouters);
app.use('/api/voting',votingRoutes);
app.use('/api/vote',voteRoutes);


module.exports=app;
