const express = require('express');
const JWT = require('jsonwebtoken');
const bodyparser= require("body-parser");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const env = require ('dotenv');
const authMiddleware = require("./Auth/auth.js");
const mongoose = require('mongoose')
const User = require('./Models/userModel.js')

const app = express();

//Setting mongoose connection
mongoose.connect(`mongodb+srv://test:${process.env.MONGOPASSWORD}@cluster0.jddfk.mongodb.net/?retryWrites=true&w=majority`,()=>{
    console.log('Connection to Databe made succesfully')
})

// configuring server Middliwares
env.config();
const path = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended:true}  ));
app.use(bodyparser.json()); 
app.use(cookieParser());



 
//defined routes
app.get('/home', authMiddleware,(req, res)=>{
         console.log(req.user)
    res.send(`Welcome ${req.user}`);
})

app.post('/register', (req, res)=>{
   
})

app.post('/login', (req, res)=>{
    
    const { username, password } = req.body

    if(username == user.username && password == user.password){
        const token = JWT.sign({id:user.id}, "superSecret",{ expiresIn: "1h"} )
        res.cookie('jwt', token, {
            maxAge: 24 * 60 * 60 * 1000,
             httpOnly:true
        });
      }else{
        res.status(401).send("Wrong info")
      }

      res.redirect('/')
    
})

//404 status
app.use((req, res)=>{
    res.status(404).send("we dont know that one 404 error")
})

app.listen(path, ()=>{

    console.log(`listening on port ${path}`)
})