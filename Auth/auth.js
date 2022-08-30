const express = require('express');
const JWT = require("jsonwebtoken");

const authorization = async (req, res, next)=>{
   const token = req.cookies.jwt;
   if(!token){
    res.send("you are not logged in");
   }else if(token){
      const user = await JWT.verify(token, "superSecret")
      req.user = user;
      next()

   }
   
     
}

module.exports = authorization;