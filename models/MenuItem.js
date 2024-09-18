const mongoose=require('mongoose');

const menuItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    is_Drink:{
        type:Boolean,
        default:false
    },
    taste:{
        type:String,
        enum:['Spicy','Salty','Sweet','Sour','Bitter'],
    },

    ingredients:{
        type:[String],
        default:[]
    },

    num_sales:{
        type:Number,
        default:0
    }
});

const MenuItem=mongoose.model('MenuItem',menuItemSchema);
module.exports=MenuItem;