import express from "express";
// import bodyParser from "body-parser";
import mongoose from "mongoose";


const DB = mongoose.connect("mongodb+srv://milton:12345@cluster0.ukmnle3.mongodb.net/");
DB.then(console.log("Mongoose connected bro"));

const app = express()



app.listen(3001,()=>{
    console.log("server also running bro")
})


