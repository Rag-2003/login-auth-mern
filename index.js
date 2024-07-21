const express = require("express");

 const app = express()
 app.use(express.urlencoded({extended:false}))
const frontend = require('./router/frontendRouter') 
 const session  = require("express-session")
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://127.0.0.1:27017/12node")
 


  app.use(session({
   secret: "tejas",  //secret key production hacker //secret key encrpt form   raghav 
   resave : false,  //login kra logout session
   saveUninitialized : false // not logoutn automatically when phone come or other websites 
 }))

 app.use(frontend)
 app.use(express.static("public"))
 app.set("view engine","ejs")
 app.listen(5000,(()=>{
    console.log("server is running on port 5000")
 }))