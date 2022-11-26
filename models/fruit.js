
/////////////////////////////////
//////////Fruits Model
////////////////////////////////
const mongoose = require('./connection')

const{Schema, model } = mongoose ///Destructuring grabbing model and Schema off mongoose

///Make fruit Schema
const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

//make fruit
const Fruit = model("Fruit", fruitSchema)


////Export Model
module.exports = Fruit