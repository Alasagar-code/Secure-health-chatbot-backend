const JWT = require("jsonwebtoken");
const express = require("express");
require("dotenv").config();
const Users = require("../models/users");
const router = express.Router();


const userauth = async(req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token)
        {
            throw new Error("Token is not valid");
        }
        const decodedtoken = await JWT.verify(token,process.env.JWT_SECRETKEY);
        
        const {_id} = decodedtoken;
        console.log(decodedtoken);
        const user = await Users.findOne({_id:_id});
        if(!user)
        {
            throw new Error("userid invalid");
        }
        req.user=user;
        next();
    }
    catch(error){
        res.status(400).send("Error"+error.message);
    }
}
router.get("/protected",userauth,async(req,res)=>{
});

module.exports={
    router,userauth
};