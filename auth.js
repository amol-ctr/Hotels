// Authentication and Authorization using passport
const passport=require('passport');
const express=require('express');
const LocalStrategy=require('passport-local').Strategy;

const bcrypt=require('bcrypt');

const Person=require('./models/Person');

passport.use(new LocalStrategy(async(Username,Password,done)=>{
    try {
        console.log('Received Credentials: ',Username,Password);
        const user=await Person.findOne({Username});
        if(!user){
            return done(null,false,{msg: 'Incorrect Username'});
        }
        const isPasswordMatch=await user.comparePassword(Password);
        if(isPasswordMatch){
            return done(null,user);
        }
        else{
            return done(null,false,{msg:'Incorrect Password'});
        }
    } 
    catch (err) {
        return done(err);
    }
}));

module.exports=passport;