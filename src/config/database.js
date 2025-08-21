const mongoose = require("mongoose");


const connectDB = async() => {
   await mongoose.connect(
  "mongodb+srv://vishwajeetsrivastava2222:osPFu6srciYCyW5J@cluster0.0harq65.mongodb.net/TinderDev"
);
}

module.exports = connectDB;




