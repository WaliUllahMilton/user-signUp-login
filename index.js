import express from "express";
import mongoose from "mongoose";


const DB = mongoose.connect("mongodb+srv://milton:12345@cluster0.ukmnle3.mongodb.net/");
DB.then(console.log("Mongoose connected bro"));

const app = express()
// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(8000,()=>{
    console.log("server also running bro")
})

const userSchema = mongoose.Schema({
    name:String,
    email:{
        type : String,
    },
    number:Number
})

const users = mongoose.model("users",userSchema)

// route 
app.get("/",(req,res)=>{
    res.send("running")
})

app.post("/registration",async(req,res)=>{
    try {
        const checkExisting = await users.findOne({"email":req.body.email});
        if(checkExisting){
            // return res.send(req.body.email) obj pathate hole .json use krte hobe
            return res.status(400).json({error:"user ase",email :req.body.email})
        }else{
            const data = new users({
                name : req.body.name,
                email : req.body.email,
                number : req.body.number,
            })
            await data.save();
            return res.send(data)
        }
    } catch (error) {
        console.log(error)
    }
})
