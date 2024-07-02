import mongoose from "mongoose";

import passportLocalMongoose from "passport-local-mongoose";
export const userSchema = mongoose.Schema({
    username:String,
    email:{
        type : String,
    },
    password:String
})

userSchema.plugin(passportLocalMongoose);
export const users = mongoose.model("users",userSchema)
