 const mongoose = require("mongoose")


const empSchema = mongoose.Schema({
        
    name : String , 
    department : String,
    salary : Number, 
    doj : Date,
})










module.exports = mongoose.model("emp" , empSchema)