const express =  require ('express');
// const helmet = require('helmet');
// const morgan =  require('morgan');
const userRoute =  require('./routes/userRoute');
const authRoute =  require('./routes/authRoute');
const postRoute =  require('./routes/postRoute');

const dotenv = require('dotenv');
const mongoose =  require('mongoose');
const app = express()

 
dotenv.config({ path: './config.env' }); 

mongoose.connect( process.env.LOCAL_DATABASE || process.env.DATABASE, {
  useNewUrlParser :  true , 
  useCreateIndex :  true ,
  useFindAndModify : false,useUnifiedTopology: true })
.then((con)=>{
    console.log(con.connections)
  console.log("connection succefull");
});


app.use(express.json())
app.use("/user",userRoute)
app.use("/auth",authRoute)
app.use('/posts',postRoute)
const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log(`app running on port ${port}`);
});
