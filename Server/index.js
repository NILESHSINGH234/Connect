let express=require('express');

let dotenv=require('dotenv');

dotenv.config('./.env');

let dbConnect=require('./dbConnect');


let authRouter=require('./routers/authRouter');
dbConnect();



let app=express();

app.use('/auth',authRouter)

const PORT=process.env.PORT||4000;

app.listen(PORT,()=>{
    console.log("app is started")
})




