 const mongoose = require("mongoose")


const regSchema = mongoose.Schema({
    userName : String,
    password: String,


})







 module.exports = mongoose.model("Reg", regSchema)
