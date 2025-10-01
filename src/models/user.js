const mongoose = require("mongoose")
const validator = require("validator")

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

module.exports = mongoose.model("Users", userSchema);