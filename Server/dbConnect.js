const mongoose=require('mongoose');

module.exports=async()=>{
    const mongoUri="mongodb+srv://dbuser:dyPN1KJ23JoG9KvO@cluster0.u3s9aur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    try{
        await mongoose.connect(mongoUri);
    }
    catch(e){
        console.log(e);
    }
    

}