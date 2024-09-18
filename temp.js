var os=require('os')
var fs=require('fs')

// converting json string into object using JSON.parse
// const jsonstring='{"name":"Amol","Age":20,"Hobbies":["Badminton","Chess","Listening Music"]}';

// const jsonobj=JSON.parse(jsonstring);
// console.log(jsonobj);

// converting json object into string using JSON.stringify
// const jsonobj={"name":"Amol","Age":20,"Hobbies":["Badminton","Chess","Listening Music"]};

// const jsonstring=JSON.stringify(jsonobj);
// console.log(jsonstring);

var func=(a,b)=>{return a+b};
module.exports={
    func,
}