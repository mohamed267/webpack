const User  =  require ('../models/User')
const router =  require('express').Router();
const bcrypt  =  require("bcrypt")
//upddate user
router.put('/:id',async (req,res)=>{
    if(req.body.userId == req.params.id  || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt =  await bcrypt.genSalt(10)
                req.body.password =  await bcrypt.hash(req.body.password,salt)
                console.log(req.body)
            }catch(err){
                return res.status(500).json(err)
            }
        }
        try{
            let user = await User.findByIdAndUpdate(req.params.id , {
                $set : req.body
            })
            return res.status(200).json("acccount has been updated")
        }catch(err){
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).send("if you are not admin you  can update just your information ")
    }
})
//delete users
router.delete('/:id',async (req,res)=>{
    if(req.body.userId == req.params.id  || req.body.isAdmin){
        try{
            let user = await User.deleteOne({"_id" : req.params.id })
            return res.status(200).json("user hes been deleted")
        }catch(err){
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).send("if you are not admin you  cannot delete another user ")
    }
})

//get a user
router.get('/:id',async (req,res)=>{
    try{
        let user = await User.findOne({"_id" : req.params.id })
        return res.status(200).json(user)
    }catch(err){
        return res.status(500).json(err)
    }
})
//follow a user 
router.put('/:id/follow',async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            let user = await User.findById(req.params.id)
            let currentUser  = await User.findById(req.body.userId) 
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push :{"followers" :req.body.userId}})
                await currentUser.updateOne({$push :{"followings" :req.params.id}})
                return res.status(200).json("user has been followed")
            }else{
                return  res.status(403).json("you already follow this user")
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).send("you cant follow your self ")
    }
})
//unfollow a user
router.put('/:id/unfollow',async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            let user = await User.findById(req.params.id)
            let currentUser  = await User.findById(req.body.userId) 
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull :{"followers" :req.body.userId}})
                await currentUser.updateOne({$pull :{"followings" :req.params.id}})
                return res.status(200).json("user has been unfollowed")
            }else{
                return  res.status(403).json("you dont folow this user")
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).send("you cant follow your self ")
    }
})


router.get('/',(req,res)=>{
    res.send("hello from the user page");
});
router.post('/',(req,res)=>{
    console.log(req.body)
    res.send(req.body);
});

module.exports = router;