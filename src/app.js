const express = require("express");
const connectDB = require("./config/database")
const Users = require("./models/user")
const app = express();

app.use(express.json())

app.post("/signUp" , async (req , res) => {
     //Creating a new instance for the user model
     const user = new Users(req.body)

     try{
       await user.save()
     res.send("User Added Successfully")
     } catch(err) {
      res.status(400).send("Error saving the user:" + err.message);
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

app.patch("/user", async (req , res) => {
 const userId = req.body.userId
 const data = req.body
  try {
    await Users.findByIdAndUpdate(userId,data)
    res.send("User Updated successfully")
  } catch (error) {
    res.status(400).send("Something wend wrong")
  }
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

 


