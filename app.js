//INCLUDING MODULES:
let express=require('express');
let app=express();
let fs=require('fs');
let path=require('path');
const bodyparser=require("body-parser");
const port=8000;

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contact');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

//Defining mongoose schema:
const contactSchema = new mongoose.Schema({
    name: String,
    email:String,
    phone:String,
    age:String,
    gender:String,
    address:String
  });
  //COMPILING THIS CONTACT SCHEMA INTO A MODEL SO THAT I AM ABLE TO SAVE THE DOCS.

  const contact = mongoose.model('Contact', contactSchema);



//EXPRESS RELATED STUFF:
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG RELATED STUFF:
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//ENDPOINTS:
app.get('/',(req,res)=>{
    let varobject={ };
    res.status(200).render('home.pug',varobject);
})
app.get('/contact',(req,res)=>{
    let varobject={ };
    res.status(200).render('contact.pug',varobject);
})

//NOW WRITING A POST REQUEST FOR THE CONTACT PAGE:
app.post('/contact',(req,res)=>  //This post request will take the post parameters from the contact page and then will store them in a database.
{
    var myData=new contact(req.body);  //It means that the request's body data will be stored in the object named contact
    //THE NEXT STEP TOWARDS SAVING OUR DATA INTO OUR DATABASE IS TO INSTALL A MODULE NAMED BODY PARSER by writing npm install body-parser in the terminal.
   myData.save().then(()=>
   {
    res.status.send("Your data has been submitted successfully in the database!");
   }).catch(()=>{
    res.status(204).send("Some error crepted in while saving your data into the database");
   }
   )  //when we will save the data using the request.body then a promise will be returned and, so as to handle that we need to use .then which is used as everything in node.js is asynchronous and then method is used for that purposes only example in the case of an API call.
});
//THE then,catch and finally methods in javascript:

//  then: when a promise is successful, you can then use the resolved data
// catch: when a promise fails, you catch the error, and do something with the error information
// finally: when a promise settles (fails or passes), you can finally do something

//STARTING THE SERVER:
app.listen(port,()=>{
    console.log(`The server has started successfully at the local port ${port}`);
})


//SOLVE THE PROBLEM OF YOUR SCHEMA NOT GETTING DISPLAYED IN THE TERMINAL WINDOW IF I WRITE db.contacts.find   despite teh fact that i can see the collectuion- contacts has been created successfully



