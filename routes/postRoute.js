const router =  require('express').Router();
const Post = require('../models/Post');


//add post 
router.post('/',async (req,res)=>{
    const  newPost = new Post({
        userId : req.body.userId,
        desc : req.body.desc,
        img : req.body.img
    })
    await newPost.save().then((doc)=>{
        console.log(doc);
        res.status(200).json(newPost)
    }).catch(err=>{
        console.log("ERROR :", err)
    })
});



module.exports  =  router