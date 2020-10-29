const express = require('express')
const app= express();
const authrouter = require('./routs/auth')
const dotenv = require('dotenv')
const mongoose=require('mongoose');
const verify = require('./routs/verifyjwt')
dotenv.config();
mongoose.connect(process.env.DBKEY,
{ useUnifiedTopology: true ,useNewUrlParser: true },()=>{console.log("connected to mongo")})
app.use(express.json())
app.use('/auth',authrouter)
app.get('/check',verify,(req,res,next)=>{
    res.send("this is a test"+JSON.stringify(req.user))
})
app.listen(3000,()=>{console.log("up and running")})