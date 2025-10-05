const express = require("express");
const connectDB = require("./config/database")
const Users = require("./models/user")
const app = express();
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth")

app.use(express.json())
app.use(cookieParser())

app.post("/signUp", async (req, res) => {
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


app.post("/login" , async(req,res) => { 
 
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

app.get("/profile",userAuth, async(req , res) => {
   
try{
     const user = req.user
    
    res.send(user)}catch (err) {
    res.status(400).send("Error: " + err.message);
  }
})

app.post("/sendConnectionRequest", userAuth , async(req,res) => {
  const user = req.user
  console.log("Sending the connection request")

  res.send(user.firstName  + "sent connection request")
})


connectDB().then(() => {
    console.log("Database Connection is Established...")

    app.listen(3000, () => {
  console.log("Hello from the server5.....");
});
})

.catch((error) => {
   console.error("Database cannot be connected....")
})

 


