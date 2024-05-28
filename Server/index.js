let express=require('express');

let dotenv=require('dotenv');

dotenv.config('./.env');

let dbConnect=require('./dbConnect');

const morgan=require('morgan');

let authRouter=require('./routers/authRouter');
dbConnect();



let app=express();


//middlewares

app.use(express.json());

app.use(morgan('common'))

app.use('/auth',authRouter)

const PORT=process.env.PORT||4000;

app.listen(PORT,()=>{
    console.log("app is started")
})




