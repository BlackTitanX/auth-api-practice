const express = require('express');
const JWT = require('jsonwebtoken');
const bodyparser= require("body-parser");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./Auth/auth.js");
const bodyParser = require('body-parser');
const env = require ('dotenv');

env.config();

const app = express();
const path = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended:true}  ));
app.use(bodyparser.json()); 
app.use(cookieParser());



 
const user = {id: 12 , username: "Israel", password: 19990204 }
app.get('/', authMiddleware,(req, res)=>{
         console.log(req.user)
    res.send(`Welcome ${req.user}`);
})

app.post('/login', (req, res)=>{
    
    const { username, password } = req.body
    console.log(username, password)

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


app.use((req, res)=>{
    res.send("we dont know that one 404 error")
})
app.listen(path, ()=>{

    console.log(`listening on port ${path}`)
})