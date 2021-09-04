const express = require("express")
const path=require('path');
const fs=require('fs');
const bodyparser = require('body-parser');
const app = express();
const port=800;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance',{useNewUrlParser:true});

// define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

var Contact = mongoose.model('Contact', contactSchema);


app.use('/static', express.static('static')) //for serving  static files
app.use(express.urlencoded());

// pug specific stuff
app.set('view engine', 'pug'); //set the template engine as pug
app.set('views',path.join(__dirname,'views'))  //set view directory

//Endpoints

app.get('/',(req, res)=>{
    const parmas ={}
    res.status(200).render('home.pug',parmas);
})
app.get('/contact',(req, res)=>{
    const parmas ={}
    res.status(200).render('contact.pug',parmas);
})

//post request
app.post('/contact',(req,res)=>{
    var myData =new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug',parmas);
})



app.listen(port, ()=>{
    console.log(`This application started successfully on port ${port}`)
})