const express=require('express');

const mongoose=require('mongoose');

require("dotenv").config({path:"./config.env"});
const authRoute=require('./routes/auth');
const userRoute=require('./routes/users');
const movieRoute=require('./routes/movies');
const listRoute=require('./routes/list');

const app=express();

mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology : true,
    // useCreateIndex:true,
}).then(()=>console.log('db connected'))
  .catch((err)=>console.log(err));


app.use(express.json());

app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/movies',movieRoute);
app.use('/api/lists',listRoute);



app.listen(8080,()=>{
    console.log('backend server is running');
})