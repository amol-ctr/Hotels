const express=require('express');

const router=express.Router();

//importing person model
const Person=require('./../models/Person');

const {jwtMiddleware,generatetoken}=require('./../jwt');

// POST method for signup by person
router.post('/signup',async (req,res)=>{
    try{
        const data=req.body     //assuming request body contains the person data
        const newPerson=new Person(data);   // creating person object using data

        const result=await newPerson.save();  //saving it in database
        console.log('Data Saved Successfully!');

        // Payload for generating token
        const payload={
            id:result.id,
            username:result.username
        }
        
        // Generating token using payload
        const token=generatetoken(payload);

        console.log('Token is:',token);
        
        res.status(200).json({response:result,token:token});
    }
    catch(err){
        console.log('Error:',err);
        res.status(500).json({err:'Internal Server error'});
    }
    
})

// POST request for login by user
router.post('/login',async(req,res)=>{
    try {      
        // Extract username and password from request body
        const {username,password}=req.body;
    
        // Find the user using the username
        const user=await Person.findOne({username:username});
    
        // Check if user exists and password is correct
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid Username or Password'});
        }
    
        // generate token
        const payload={
            id:user.id,
            username:user.username
        }
    
        const token=generatetoken(payload);
    
        res.status(200).json({token:token});
    } 
    catch (err) {
        console.log(err);
        res.status(401).json({error:err});
    }

})

// Profile route
router.get('/profile',jwtMiddleware,async(req,res)=>{
    try {
        const data=req.user;

        const ID=data.id;
        const user= await Person.findById(ID);
        res.status(200).json({user});
    } 
    catch (err) {
        console.log(err);
        res.status(400).json({err:'Internal server error'});
    }
})

// GET method for person
router.get('/',jwtMiddleware,async (req,res)=>{
    try{
        const data=await Person.find();
        console.log('Data found Successfully!');
        res.status(200).json(data);
    }
    catch(err){
        console.log('Error found!');
        res.status(500).json({error:"Internal Server Error"});
    }
});

// parametrized API calls
router.get('/:worktype',async (req,res)=>{
    try {
        
        const worktype=req.params.worktype;
        if(worktype=='chef' || worktype=='manager' || worktype=='waiter'){
            const result=await Person.find({profession:worktype});
            // if(!result){
            //     res.status(404).json({error:'Not Found'});
            // }
            console.log('Data fetched successfully');
            res.status(200).json(result);
        }
        else{
            res.status(404).json({error:'Not found'});
        }
    }
    catch (err) {
        console.log('Error found!');
        res.status(500).json({error:"Internal Server Error"});
    }
});

// Update method
router.put('/:id',async (req,res)=>{
    try {
        const person_id=req.params.id;
        const updated_data=req.body;

        const result=await Person.findByIdAndUpdate(person_id,updated_data,{
            new:true,
            runValidators:true
        })

        if(!result){
            res.status(404).json({error:'Not Found'});
        }

        console.log('Data Updated successfully');
        res.status(200).json(result);
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

// Deleting a record using ID
router.delete('/:id',async (req,res)=>{
    try {
        
        const person_id=req.params.id;
    
        const result=await Person.findByIdAndDelete(person_id);
    
        if(!result){
            res.status(404).json({error:'Not Found'});
        }
        console.log('Data Deleted successfully');
        res.status(200).json({msg:'Deleted Successfully'});
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

module.exports=router;