const express = require("express");
const cors = require("cors");

const pinControllers = require("./controllers/pinControllers.js")


const app = express()

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("Hello, world!");
  });
  
app.use("/pins", pinControllers);
  
app.get("*", (req,res)=>{
  res.status(404).send("Page Not Found")
})




module.exports = app;