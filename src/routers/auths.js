const {validateSignUpData} = require("../utils/validation");
const Users = require("../models/user")
const express = require("express")
const bcrypt = require("bcrypt");


const authRouter = express.Router();

authRouter.post("/signUp", async (req, res) => {
  try {
    // validate the data
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;

    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Creating a new instance for the user model
    const user = new Users({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/login" , async(req,res) => { 
 
  try {
     const {email , password} = req.body;
     
     const user = await Users.findOne({email: email})
     if(!user){
      throw new Error("Invalid Credentials")
     }

     const isPasswordValid = await user.validatePassword(password);
     if(isPasswordValid){
        //Creating a JWT token 
        const token = await user.getJWT();
        

        //Add token to the cookies and sending the response to the user
        res.cookie("token" , token , {expires: new Date(Date.now() + 8 * 3600000)} )
        res.send("Login Successfull")
     }else{
      throw new Error("Invalid is Credentials")
     }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
})

authRouter.post("/logout" , async (req , res) => {
   res.cookie("token", null , {
     expires : new Date(Date.now())
   })
   res.send("Logout Sucessfully!!!")
})

module.exports = authRouter;