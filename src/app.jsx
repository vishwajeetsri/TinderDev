const express = require("express");

const app = express();

app.use("/test",(req,res,next) => {
  console.log("Handling Response of user 1");
  //res.send("Response");
  next()

}, (req , res ,next) => {
    console.log("Handling Response of user 2")
    //res.send("Response 2")
    next()
    
}, (req , res ,next) => {
    console.log("Handling Response of user 3")
    //res.send("Response 3")
    

  },(req , res ,next) => {
    console.log("Handling Response of user 4")
    res.send("Response 4")
    next()
  } )

 

app.listen(3000, () => {
  console.log("Hello from the server5.....");
});
