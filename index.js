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
const dburl = `mongodb+srv://userTest:JdjRoi5fAlSh4uOO@cluster0.jddfk.mongodb.net/UserDatabase`;
const connectionsParams = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}
mongoose.connect(dburl,connectionsParams).then(()=>{
    console.log('Connected')
})
// configuring server Middliwares
env.config();
const path = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended:true}  ));
app.use(bodyparser.json()); 
app.use(cookieParser());



 
//defined routes
app.get('/home', authMiddleware,(req, res)=>{
         console.log()
    res.send(`Welcome ${req.user}`);
})

app.post('/register', async (req, res)=>{
  
   const userExists = await User.findOne({email: req.body.email})
   
   if(userExists){
    
    return res.status(400).send('email already exist')
   }else{

   try{
        
        const user = await new User({
            name:req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        const newUser = await user.save().then((userSaved)=>{
            console.log(userSaved)
        })
        const token = JWT.sign({id:User._id}, "superSecret", {expiresIn:"1h"});
        res.cookie('jwt', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly:true
        });
        res.send(newUser)
   }catch(e){
    res.status(500);
   }
}
})

app.post('/login', async (req, res)=>{
    
    const { username, password } = req.body
     
     try{
        const userExists = await User.find({username: req.body.username});
        if(!userExists){
            return res.status(404).json('user does not exist')
        }else{
            
        const user = await User.find({username:username})
        
        if(username == user[0].username && password == user[0].password){
            
           const token = JWT.sign({id:user[0]._id}, "superSecret",{ expiresIn: "1h"} )
           res.cookie('jwt', token, {
               maxAge: 24 * 60 * 60 * 1000,
                httpOnly:true
        });
         
        res.redirect('/home')
        }
          
        }
         
        
    }catch(e){
       res.status(500).json('An error has ocurred');
    }
    
})

//404 status
app.use((req, res)=>{
    res.status(404).send("we dont know that one 404 error")
})

app.listen(path, ()=>{

    console.log(`listening on port ${path}`)
})