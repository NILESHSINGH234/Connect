const User=require('../model/User')

const signupController=async(req,res)=>{
    try{
const {name,email,password}=req.body;

if (!email || !password || !name) {
    // return res.status(400).send("All fields are required");
    return res.status(400).send("All fields are required");
}


const oldUser = await User.findOne({ email });
if (oldUser) {
    // return res.status(409).send("User is already registered");
    return res.status(409).send( "User is already registered");
}


const hashedPassword = await bcrypt.hash(password, 10);


const user = await User.create({
    name,
    email,
    password: hashedPassword,
});

return res.json(
user
);
    }catch(e){
        console.log(e)
    }
}


const loginController=async(req,res)=>{
    try{
res.send('signu')
    }catch(e){
        console.log(e)
    }
}

module.exports={signupController,loginController}