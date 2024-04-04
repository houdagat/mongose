const mongoose = require ('mongoose')

// person schema
const personSchema = new mongoose.Schema({
        name :{
            type : String,
            required :true,
                },
        age : {
            type : Number,
              },
        favorite_foods :{
            type : [String]
              },
        dateCreation: {
            type: Date,
            default: Date.now()
            }       
})  
// create model 
module.exports = Person = mongoose.model('Persons', personSchema);

