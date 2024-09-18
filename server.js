const express=require('express');
const app=express();

// establishing database connection
const db=require('./db');   

// Body Parser used to extract body from POST request by client
const bodyParser=require('body-parser');
app.use(bodyParser.json());

const MenuItem=require('./models/MenuItem');

app.get('/',(req,res)=>{
    res.send('Welcome to my website!')
});



const personroutes=require('./routes/personroutes');
app.use('/person',personroutes);

const menuItemroutes=require('./routes/menuroutes');
app.use('/menu',menuItemroutes);

app.listen(3000,()=>{
    console.log("Server running at port 3000!")
})
// new comment for checking commit