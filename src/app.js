const express = require("express");
const connectDB = require("./config/database")
const Users = require("./models/user")

const app = express();

app.post("/signUp" , async (req , res) => {
     //Creating a new instance for the user model
     const user = new Users(
      {
        firstName: "vishu",
        lastName: "sri",
        email: "v@gmail.com",
        password: "v@123"
      }
     )

     try{
       await user.save()
     res.send("User Added Successfully")
     } catch(err) {
      res.status(400).send("Error saving the user:" + err.message);
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

 


