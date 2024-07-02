import express, { response } from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import { userRegistration } from "./middlewares/userRegistration.js";
import { users } from "./models/userModel.js";
import { login } from "./middlewares/login.js";
// import { userSchema } from "./models/userModel";
const DB = mongoose.connect("mongodb+srv://milton:12345@cluster0.ukmnle3.mongodb.net/");
DB.then(console.log("Mongoose connected bro"));


const app = express()
//session
app.use(session({
    secret: 'ANYthing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

  app.use(passport.initialize())
  app.use(passport.session())
// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(8000,()=>{
    console.log("server also running bro")
})




// schema


//CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(users.createStrategy());

passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());

// route 
app.get("/",(req,res)=>{
    res.send("running")
})
app.post("/registration", (req, res) => {
    // Assuming 'users.register' and 'users.authenticate' are functions provided by Passport or your User model

    // Registering a new user
    users.register({username: req.body.username,email:req.body.email, active: false}, req.body.password, function(err, user) {
        if (err) {
            return res.status(400).json({ error: err.message }); // Handle registration error
        }
        res.status(200).json({
            msg: "hoise"
        })
        // // Authenticating the registered user
        // passport.authenticate('local')(req, response, function () {
        //     // Authentication successful, but you might want to check 'user' object for additional logic
        //     res.status(200).json({ message: "Registration successful" });
        // });
    });
});


app.post("/login",login)

