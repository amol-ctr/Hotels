const express=require('express');

const router=express.Router();

//importing person model
const Person=require('./../models/Person');

router.post('/',async (req,res)=>{
    try{
        const data=req.body     //assuming request body contains the person data
        const newPerson=new Person(data);   // creating person object using data

        const response=await newPerson.save();  //saving it in database
        console.log('Data Saved Successfully!');
        res.status(200).json(response);
    }
    catch(err){
        console.log('Error:',err);
        res.status(500).json({err:'Internal Server error'});
    }
    
})

router.get('/',async (req,res)=>{
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