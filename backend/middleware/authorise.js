const authorized = (role)=>{
    return (req,res,next)=>{
        const bodyrole = req.role;
        if(role.includes(bodyrole)){
            next();
        }else{
            res.send({"msg":"You are not authorised"})
        }
    }
}

module.exports = authorized;