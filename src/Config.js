const { create } = require("connect-mongo");
const { name } = require("ejs");
const mongoose = require ("mongoose");
const connect = mongoose.connect("mongodb+srv://user:user@cluster0.jwphp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// Database cheack
connect.then(()=>{
    console.log("DataBase successfully connected");
    
})

.catch((err)=>{
    console.log("DataBase Not connected",err);
    
})

// create Schema
const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

// Collection part
const collection = new mongoose.model("user", LoginSchema);

module.exports = collection;