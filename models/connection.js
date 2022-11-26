

/////////////////////////////////
//////////Database Connection
/////////////////////////////////
require("dotenv").config() // load env files
const mongoose = require('mongoose') // gives us that db connection and cool methods for CRUD
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


//Establish our connection
mongoose.connect(DATABASE_URL, CONFIG);

// Log connction events from mongoose
mongoose.connection
    .on("open", ()=> console.log('Mongoose connected'))
    .on("closed", ()=> console.log('Mongoose disconnected'))
    .on("error", ()=> console.log('Mongoose error, error'))

//////Export Mongoose
    module.exports = mongoose