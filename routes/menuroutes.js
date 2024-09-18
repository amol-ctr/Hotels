const express=require('express');
const router=express.Router();

// Importing menu item model(schema)
const MenuItem=require('./../models/MenuItem');

router.post('/',async (req,res)=>{
    try{
        const data=req.body;
        const newMenuItem=new MenuItem(data);
        const result=await newMenuItem.save();
        console.log('Data Saved Successfuly!');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/',async (req,res)=>{
    try {
        const result=await MenuItem.find();
        console.log('data found successfully!');
        res.status(200).json(result);
        
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }

});

router.get('/:taste',async (req,res)=>{
    try {
        
        const taste=req.params.taste;
        if(taste=='Spicy' || taste=='Sour' || taste=='Sweet' || taste=='Bitter' || taste=='Salty'){
            const result=await MenuItem.find({taste:taste});
            // if(!result){
            //     res.status(404).json({error:'Not Found'});
            // }
            console.log('Data Fetched Successfully');
            res.status(200).json(result);
        }
        else{

            res.status(404).json({error:'Not Found'});
        }
    } 
    catch (err) {
        console.log(err);
        res.status(200).json({error:'Internal Server Error'});
    }

})

router.put('/:id',async (req,res)=>{
    try {
       const item_id=req.params.id;
       const updated_data=req.body;
       
       const result=await MenuItem.findByIdAndUpdate(item_id,updated_data,{
        new:true,
        runValidators:true
       });

       if(!result){
        res.status(404).json({error:'Not Found'});
       }
       else{

           console.log('Data Updated Successfully!');
           res.status(200).json(result);
       }
    } 
    catch (err) {
        console.log(err);
       res.status(200).json({error:'Internal Server Error'});
    }
})

router.delete('/:id',async (req,res)=>{
    try {
        const item_id=req.params.id;
        const result=await MenuItem.findByIdAndDelete(item_id);
        if(!result){
            res.status(404).json({error:'Not Found'});
        }
        else{
    
            console.log('Data Deleted Successfully!');
            res.status(200).json({msg:'Deleted Successfully!'});
        }
    } 
    catch (err) {
        console.log(err);
        res.status(200).json({error:'Internal Server error'});
    }
})

module.exports=router;