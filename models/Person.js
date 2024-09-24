const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
// const { has } = require('lodash');
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
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
});

personschema.pre('save',async function(next){
    const person=this;

    // if password is not modified or not new then hashing is not required
    if(!person.isModified('password')){
        return next();
    }

    try {

        // Generating a salt of 10 size
        const salt=await bcrypt.genSalt(10);
        
        // mixing salt in our password and then hashing it
        const hashed_password=await bcrypt.hash(person.password,salt);
        person.password=hashed_password;

        next();
    } 

    catch (err) {
        return next(err);
    }
});

personschema.methods.comparePassword=async function(candidatePassword){
    try {
        
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    } 
    catch (err) {
        throw err;
    }
}

// Create person model
const Person=mongoose.model('Person',personschema);
module.exports=Person