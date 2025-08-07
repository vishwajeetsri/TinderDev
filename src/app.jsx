const express = require("express")

const app = express()


app.use("/test",(req,res) => {
    res.send("Hello response from the server test")
});

app.use("/",(req,res) => {
    res.send("Hello response from the server Home")
});

app.listen(3000, () => {
    console.log("Hello from the server5.....")
});
