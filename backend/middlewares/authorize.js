const jwt = require('jsonwebtoken')

const authorise=(permittedRole)=>{
       return (req,res,next)=>{
        // const token=req.headers?.['Authorization'].split(' ')[0];
        // const decoded=jwt.decode(token);
        const role=req.body.userRole;
        if(permittedRole.includes(role)){
            next()
        }else{
            res.send({"msg":"You are not authorise to do this"})
        }
       }
}

module.exports={authorise}