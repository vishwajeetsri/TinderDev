const express = require("express")
const {userAuth} = require("../middlewares/auth")
const profileRouter = express.Router()
const {validateProfileEditData} = require("../utils/validation")

profileRouter.get("/profile/view",userAuth, async(req , res) => {
   
try{
     const user = req.user
    
    res.send(user)}catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/edit" , userAuth , async(req , res) => {
  try {
    if(!validateProfileEditData(req)){
      throw new Error("Invalid Edit request")
    }
   
    const loggedInUser = req.user
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))
    await loggedInUser.save();

    res.send("Profile Updated Successfully!!")

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
} )

module.exports = profileRouter;