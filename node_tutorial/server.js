const express = require("express");
const app = express();
const db = require('./db');

require('dotenv').config();


const bodyParser = require("body-parser");
app.use(bodyParser.json());
//here bodyParser.json() will convert the json data and store it in req.body 


app.get("/", function (req, res) {
    res.send("Welcome to my Hotel....how can i Help you !!");
});

const personRoutes = require('./Routes/personRoutes');
const menuRoutes = require('./Routes/menuRoutes');

app.use('/person',personRoutes)
app.use('/menu',menuRoutes)

const PORT = process.env.PORT || 3000;

const mongoURL = process.env.MONGODB_URL || "mongodb://localhost:27017/hotels";
console.log(mongoURL);
app.listen(PORT,() => {
    console.log("Server is listening on port 3000");
});
