const express = require("express");
const connectDB = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")

app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true, // allow cookies & auth headers

}));
app.use(express.json())
app.use(cookieParser())


const authRouter = require("./routers/auths")
const profileRouter = require("./routers/profile")
const requestRouter = require("./routers/request")
const userRouter = require("./routers/user")

app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);
app.use("/" ,  userRouter)


connectDB().then(() => {
    console.log("Database Connection is Established...")

    app.listen(3000, () => {
  console.log("Hello from the server5.....");
});
})

.catch((error) => {
   console.error("Database cannot be connected....")
})

 


