const express = require("express");
const connectDB = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")
require("dotenv").config()

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
const http = require("http");
const initializeSocket = require("./utils/socket");

app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);
app.use("/" ,  userRouter)

const server = http.createServer(app);
initializeSocket(server);



connectDB().then(() => {
    console.log("Database Connection is Established...")

    server.listen(process.env.PORT, () => {
  console.log("Hello from the server5.....");
});
})

.catch((error) => {
   console.error("Database cannot be connected....")
})

 


