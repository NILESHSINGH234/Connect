let express=require('express');

let dotenv=require('dotenv');

dotenv.config('./.env');

let dbConnect=require('./dbConnect');


dbConnect();



let app=express();

const PORT=process.env.PORT||4000;

app.listen(PORT,()=>{
    console.log("app is started")
})




