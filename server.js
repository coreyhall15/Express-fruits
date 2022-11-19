require("dotenv").config() // load env files
const express = require('express') //bring in express to make our app
const morgan = require('morgan') // nice ledger for our request
methodOverride = require('method-override')
const mongoose = require('mongoose') // gives us that db connection and cool methods for CRUD
const PORT = process.env.PORT

const app = express()

/////////////////////////////////
//////////Database Connection
/////////////////////////////////

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


/////////////////////////////////
//////////Fruits Model
////////////////////////////////

const{Schema, model } = mongoose ///Destructuring grabbing model and Schema off mongoose

///Make fruit Schema
const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

//make fruit
const Fruit = model("Fruit", fruitSchema)


/////////////////////////////////
///Middleware
/////////////////////////////////

app.use(morgan("tiny"))//logging
app.use(methodOverride("_method"))//override for put and delete requests from forms
app.use(express.urlencoded({extended: true}))//parse urlencoded request bodies
app.use(express.static("public"))//use static files in a public directory



////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("your server is running... better catch it.")
})

app.get('/fruits/seed', (req, res)=> {
    //define data we want in the folder
    const startingFruits = 
    [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
      ]

      //Delete all fruits
      Fruit.deleteMany({}, (err, data) => {
        //create new fruits
        Fruit.create(startingFruits, (err, data)=> {
            res.json(data)
        })
      })
})


//Index Routes
app.get('/fruits', (req, res) => {
    //get all fruits from mango and send them back
    Fruit.find({}) 
        .then((fruits) => {
            //res.json(fruits)
            res.render('fruits/index.ejs', {fruits})
        })
    
})

// new route
app.get("/fruits/new", (req, res) => {
    res.render('fruits/new.ejs')
})

//post route
app.post('/fruits' , (req, res) =>{
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
    Fruit.create(req.body, (err, createdFruit) =>{
        console.log(createdFruit)
        res.redirect('/fruits')
    })
})

app.get('/fruits/:id', (req, res) => {
   //go and get fruit from database
    Fruit.findById(req.params.id)
    .then((fruit) =>{
        res.render('fruits/show.ejs', {fruit})
    })
    
})

////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////

app.listen(PORT, () => console.log('Bands will make her dance on port: ${PORT}'))