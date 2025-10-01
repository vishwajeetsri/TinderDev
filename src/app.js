const express = require("express");
const connectDB = require("./config/database")
const Users = require("./models/user")
const app = express();
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")

app.use(express.json())

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

     const isPasswordValid = await bcrypt.compare(password , user.password)
     if(isPasswordValid){
        res.send("Login Successfull")
     }else{
      throw new Error("Invalid is Credentials")
     }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
})

// find all the users with the given email
app.get("/user", async(req, res) =>{
 const userEmail = req.body.email

  try {
    const user = await Users.find({email : userEmail})
     if (user.length === 0) {
      res.status(404).send("User not found")
    }else{
      res.send(user)
    }
  } catch (error) {
    res.status(400).send("Something wend wrong")
  }
})

//find only one users with same email of different users.

app.get("/findOne", async(req, res) =>{
 const userEmail = req.body.email

  try {
    const user = await Users.findOne({email : userEmail})
    if (!user) {
      res.status(404).send("User not found")
    }else{
      res.send(user)
    }
  
  } catch (error) {
    res.status(400).send("Something wend wrong")
  }
})

//feed 

app.get("/feed", async(req, res) => {

   try {
      const users = await Users.find({});
      res.send(users)

   } catch (error) {
      res.status(400).send("Something wend wrong")
   }
})


//delete a user from database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const users = await Users.findByIdAndDelete(userId)
    res.send("User Deleted Successfully")
  } catch (error) {
    res.status(400).send("Something wend wrong")
  }

})

//update a user from database

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const updates = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "gender", "about", "age", "skills"];
    const isUpdateAllowed = Object.keys(updates).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    const updatedUser = await Users.findByIdAndUpdate(userId, updates, {
      runValidators: true,
      new: true
    });

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.send(updatedUser);
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
});





connectDB().then(() => {
    console.log("Database Connection is Established...")

    app.listen(3000, () => {
  console.log("Hello from the server5.....");
});
})

.catch((error) => {
   console.error("Database cannot be connected....")
})

 


