const { findById } = require("../models/user");
const Users = require("../models/user")
const jwt = require("jsonwebtoken");


const userAuth = async (req, res, next ) => {
try {
    const {token} = req.cookies
    if(!token){
        throw new Error("Token is not valid...")
    }

    const decodeObj = await jwt.verify(token , "DEV@Tinder$790")

    const { _id } = decodeObj

    const user = await Users.findById(_id)
    if(!user){
        throw new Error("User not found...")
    }

    req.user = user;
    next();
} catch (error) {
    res.status(400).send("ERROR: " + error.message);
}
};

module.exports = {
    userAuth,
}