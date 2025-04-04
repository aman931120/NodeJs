const express = require("express");
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth')


const bodyParser = require("body-parser");
app.use(bodyParser.json());
//here bodyParser.json() will convert the json data and store it in req.body 


// Middleware Function
const logRequest = (req,res,next) => {
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next();     // move to next phase
    // middle ware function always passed the next function  
}
app.use(logRequest)

const Person = require('./models/Person');

app.use(passport.initialize());
const localAuthMiddleware =  passport.authenticate('local',{session: false})

app.get("/", function (req, res) {
  res.send("Welcome to my Hotel....how can i Help you !!");
});

const personRoutes = require('./Routes/personRoutes');
const menuRoutes = require('./Routes/menuRoutes');
// const Person = require("./models/Person");

app.use("/person", localAuthMiddleware, personRoutes);
app.use('/menu' ,menuRoutes)

const PORT = process.env.PORT || 3000;

const mongoURL = process.env.MONGODB_URL || "mongodb://localhost:27017/hotels";
console.log(mongoURL);
app.listen(PORT,() => {
    console.log("Server is listening on port 3000");
});
