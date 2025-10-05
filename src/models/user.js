const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 50,
    }, 

    lastName: {
        type : String,
    },

     password: {
        type : String,
        required : true,
    },

    email:{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate: (value) => {
           if(!validator.isEmail(value)){
            throw new Error("Invalid email address: " + value);
           }
        }
    },

     age: {
        type : Number,
        min: 18,
    },

    gender:{
         type : String,
         validate: (value) => {
            if(!["male" , "female" , "others"].includes(value)){
                throw new Error("Gender data is not valid") 
            }

      }
    },

    photoUrl: {
        type: String,
        default: "https://wallpapers.com/cool-profile-pictures"
    },

    about: {
        type: String,
        default: "This is a default abeot way",
    },
    
    skills: {
        type: [String]
    },


},
{
    timestamps : true,
},
)

userSchema.methods.getJWT = async function (){
const user = this;  
const token = await jwt.sign({ _id: user._id} , "DEV@Tinder$790" , {expiresIn: "1d"})
 return token; 
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash,
    );
    return isPasswordValid;
};

module.exports = mongoose.model("Users", userSchema);