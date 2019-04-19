const express=require('express');
const router=express.Router();
const electricitycontroller=require('../../controlers/user/electric');

router.get('/',electricitycontroller.getAlldata);
router.post('/',electricitycontroller.sendData);

module.exports=router;