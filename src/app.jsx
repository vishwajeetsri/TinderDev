const express = require("express")

const app = express()

app.get("/users",(req,res) => {
    res.send({firstname : "vishu", lastname : "srivastava" })
});

app.post("/users",(req,res) => {
    res.send("Data successfully saved to data base")
});

app.delete("/users",(req,res) => {
    res.send("Data deleted")
});

app.use("/test",(req,res) => {
    res.send("test response from the server test")
});

// app.use("/",(req,res) => {
//     res.send("/ response from the server Home")
// });

app.listen(3000, () => {
    console.log("Hello from the server5.....")
});
