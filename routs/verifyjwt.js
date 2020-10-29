const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    const token = req.header('jwt')
    if(token)
    {
        if(jwt.verify(token,process.env.secretkey)){
            const verified = jwt.verify(token,process.env.secretkey)
            req.user=verified
            next();

        }
        else{
            res.status(400).send("bad auth")
        }
    }
    else{
        res.status(400).send("bad auth")
    }
}