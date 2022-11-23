const express = require('express')
const Fruit = require('../models/fruit')


/////////////////////////
//////Create Router

const router = express.Router()//Will have all routes attatched




////////////////////////////////////////////
// Actual Routes
////////////////////////////////////////////
//router.get("/", (req, res) => {
  //  res.send("your server is running... better catch it.")
//})

router.get('/seed', (req, res)=> {
    
})


//Index Routes
router.get('/', (req, res) => {
    //get all fruits from mango and send them back
    Fruit.find({}) 
        .then((fruits) => {
            //res.json(fruits)
            res.render('fruits/index.ejs', {fruits})
        })
    
})

// new route
router.get("/new", (req, res) => {
    res.render('fruits/new.ejs')
})

//post route
router.post('/' , (req, res) =>{
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
    Fruit.create(req.body, (err, createdFruit) =>{
        console.log(createdFruit)
        res.redirect('/fruits')
    })
})



// show route to edit
router.get("/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id

    // find the particular fruit from the database
    Fruit.findById(id, (err, foundFruit) => {
        console.log(foundFruit)
        // render the template with the data from the database
        res.render("fruits/edit.ejs", {fruit: foundFruit})
    })
})


//update route
router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    // update the fruit
    Fruit.findByIdAndUpdate(id, req.body, {new: true}, (err, updatedFruit) => {
        // redirect user back to main page when fruit 
        res.redirect(`/fruits`)
    })
})

//Get ID route
router.get('/:id', (req, res) => {
   //go and get fruit from database
    Fruit.findById(req.params.id)
    .then((fruit) =>{
        res.render('fruits/show.ejs', {fruit})
    })
    
})

router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // delete the fruit
    Fruit.findByIdAndRemove(id, (err, fruit) => {
        // redirect user back to index page
        res.redirect("/fruits")
    })
})

////////////////////////////////////////
///////Export Router to use in other files
////////////////////////////////////////

module.exports = router