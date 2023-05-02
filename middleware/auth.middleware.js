const jwt = require("jsonwebtoken")
const AuthMiddleWare = (req,res,next)=>{
    var token = req.headers.authorization
    if(token){
         try{
            var decoded = jwt.verify(token.split(" ")[1], 'evaluation');
            if(decoded){
                // console.log(decoded);
                req.body.authorId=decoded.authorId
                next()
            }else{
                res.status(200).send({msg:"Please Login first!!"})
            }
         }catch (error) {
            res.send({msg:"Please Login first!!"})
         } 
       
    }else{
        res.send({msg:"Please Login first!!"})
    }
    }


    module.exports={
        AuthMiddleWare
    }
    