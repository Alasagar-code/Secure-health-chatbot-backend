const mongoose = require("mongoose");
require("dotenv").config();
const JWT = require("jsonwebtoken");

const user_schema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20
    },
    lastName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20
    },
    emailId:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:{ 
            values:["doctor","patient","admin"],
            message:`{VALUE} is not valid role`
        },
        default:"patient"
    }
},{timestamps:true})

user_schema.methods.getJWT = async function(){
    const user = this;
    const jwt_token = await JWT.sign({_id:user._id,role:user.role},process.env.JWT_SECRETKEY,{
        expiresIn:"1d",
    });
    return jwt_token;
}

const Users = mongoose.model("Users",user_schema);

module.exports=Users;

