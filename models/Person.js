const mongoose=require('mongoose');

// Define person schema
const personschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    profession:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})

// Create person model
const Person=mongoose.model('Person',personschema);
module.exports=Person