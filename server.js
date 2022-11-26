require("dotenv").config() // load env files
const express = require('express') //bring in express to make our app
const morgan = require('morgan') // nice ledger for our request
methodOverride = require('method-override')
//const mongoose = require('mongoose') // gives us that db connection and cool methods for CRUD
const PORT = process.env.PORT
const Fruit = require('./models/fruit')
const FruitRouter = require('./controllers/fruit')
const app = express()





/////////////////////////////////
///Middleware
/////////////////////////////////

app.use(morgan("tiny"))//logging
app.use(methodOverride("_method"))//override for put and delete requests from forms
app.use(express.urlencoded({extended: true}))//parse urlencoded request bodies
app.use(express.static("public"))//use static files in a public directory
app.use('/fruits',FruitRouter)









////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////

app.listen(PORT, () => console.log('Bands will make her dance on port: ${PORT}'))