// this file is resposible for setting up connection between mongoDb and Node js server 


const mongoose = require('mongoose');

require('dotenv').config();


// define the MongoDB connection URL
// const mongoURL = "mongodb://localhost:27017/hotels"
const mongoURL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/hotels";

  
  

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
                                      
// set up mongoDb connection [ This ensures that we are working with our new MongoDb version]
mongoose.connect(mongoURL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})



// THE ABOVE THING ARE REQUIRED FILE TO ESTABLISH THE CONNECTION NO NEED TO MEMORIZE IT YOU CAN COPY PASTE ANYTIME 


const db = mongoose.connection;
// this db object is maintained by mongoose so that it always connect with database by using this db only. We will establish connecion between database and server .

db.on('connected',() => {
    console.log("Connected to MongoDB server");
})

db.on("error", (err) => {
  console.log("MongoDB connecion error",err);
});

db.on('disconnected',() => {
    console.log("MongoDB disconnected");
})


// Export the Database Connection
module.exports = db;