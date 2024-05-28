

let getAllpostController=async(req,res)=>{
    console.log(req._id);
    return res.send(req._id);
}

module.exports={getAllpostController};