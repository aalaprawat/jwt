const bcrypt = require('bcryptjs')
const express = require ('express');
const user = require("../models/user");
const app = express();
const User = require('../models/user')
const jwt = require('jsonwebtoken')
app.get(('/'),(req,res,next)=>{
    res.send("working auth router")
})
app.post(('/signup'),(req,res)=>{

    var hashed = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashed
    })
    user.save()
    .then((result)=>{
            console.log(result);
            res.send("user added") 
    })
    .catch((err)=>{
        console.log(err)
        res.send("something is wrong ")
    })
})
app.get(('/users'),(req,res)=>{
    user.find({})
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err)
        res.send("something is wrong")
    })
})

app.post(('/login'),(req,res)=>{
    const hash = req.body.password
    user.findOne({name:req.body.name})
    .then((result)=>{
        if(bcrypt.compareSync(hash,result.password)){
            const token = jwt.sign({_id:result._id,name:result.name},process.env.secretkey)
            res.header('jwt',token).send(token)
        }
        else{
            res.send("bad authentication")
        }
    })
    .catch((err)=>{
        res.send("no user with particular name")
    })
})

module.exports = app;