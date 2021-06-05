const router =  require('express').Router();
const bcrypt = require("bcrypt");
const User = require('../models/User'); 
router.get('/',(req,res)=>{
    res.send("hello from the auth page");
});


//Register
router.post('/register',async (req,res)=>{   
    const salt  =  await bcrypt.genSalt(10);
    const password =  await bcrypt.hash(req.body.password, salt)
    const newuser =   new User({
        username : req.body.username,
        email : req.body.email,
        password : password,
    });
    
    await newuser.save().then((doc)=>{
        console.log(doc);
        res.status(200).json(newuser)
    }).catch(err=>{
        console.log("ERROR :", err)
    })
    
 });

router.post('/login',async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user) return  res.status(404).send("user not found")

        const validPassword =  await bcrypt.compare(req.body.password , user.password);
        if (!validPassword)   return res.status(400).send("wrong password")

        return res.status(200).json(user)
    }catch(err){
        return res.status(200).json(err)
    };
})

module.exports = router;