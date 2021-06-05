const mongoose =  require('mongoose');
 
const Schema = mongoose.Schema({
    userID : {
        type :  String,
        require :  true,
    },
    
    desc : {
        type : String,
        max : 500
    },
    img :{
        type:String,
    },
    likes : {
        type : Array(),
        default : []
    }
},{timestamps :  true});


module.exports = mongoose.model("posts",Schema);