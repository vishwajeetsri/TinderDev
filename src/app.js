const express = require("express");
const connectDB = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser");



app.use(express.json())
app.use(cookieParser())


const authRouter = require("./routers/auths")
const profileRouter = require("./routers/profile")
const requestRouter = require("./routers/request")

app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);


connectDB().then(() => {
    console.log("Database Connection is Established...")

    app.listen(3000, () => {
  console.log("Hello from the server5.....");
});
})

.catch((error) => {
   console.error("Database cannot be connected....")
})

 


