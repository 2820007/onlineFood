import mongoose  from "mongoose";


const userSchema=mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,

    },

    password:{
        type:String,
        required:true,


    }
    ,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    image:{
        type:String,
        
    }

})


const User=mongoose.model("User",userSchema)


export default User