const Users = require("../models/users.js");
const {validatesignupdata,validatepassword} = require("../middlewares/validation.js");
const {validationResult} = require("express-validator");
require("dotenv").config();
const bcrypt = require("bcrypt");
const ratelimiter = require("express-rate-limit");

const signup = async(req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).send({errors:array()});
        }
        validatesignupdata(req);
        const {firstName,lastName,emailId,password,role} = req.body;
        const email = await Users.findOne({
            emailId : emailId
        })
        if(email)
        {
            throw new Error("Email is already exists");
        }
        validatepassword(password);
        const passwordhash = await bcrypt.hash(password,10);

        const User = new Users({
            firstName,
            lastName,
            emailId,
            password:passwordhash,
            role
        });
        await User.save();
        res.send("saved successfully");
    }
    catch(error){
        res.status(400).send("Error"+error.message);
    }
}

const login = async(req,res)=>{
    try
    {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()});
        }
        const {emailId,password} = req.body;
        const user = await Users.findOne({emailId:emailId});
        console.log(user);
        if(!user)
        {
            throw new Error("there is no user");
        }
        const is_password = await bcrypt.compare(password,user.password);
        if(is_password)
        {
            //create a jwt token
            const token = await user.getJWT();
            //store jwt token into cookie
            res.cookie("token",token,
            {
                httpOnly:true,
                secure: process.env.NODE_ENV === "production",
                expires:new Date(Date.now()+(8*3600000)),
                sameSite:"strict",
                sameSite:"lax"
            });
            res.status(200).json({
                message:"Login successful",
                user :{
                    _id:user._id,
                    emailId:user.emailId,
                    role:user.role
                }
            });
        }
        else
        {
            return res.status(400).send("Password is incorrect");
        }
    }
    catch(error)
    {
        res.status(400).send("Error "+error.message);
    }
}

const logout = async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.send("logout successfully");
}

const loginlimiter = ratelimiter({
    windowMS:15*60*1000,
    max:5,
    message:"Too many login attempts.Try again localStorage"
})
module.exports={
    signup,
    login,
    logout,
    loginlimiter
};
