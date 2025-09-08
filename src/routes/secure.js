const express = require("express");
const securerouter = express.Router();
const {userauth} = require("../middlewares/authmiddleware.js");
const roleaccess = require("../middlewares/rolemiddleware.js");

securerouter.get("/routes/admin",userauth,roleaccess(["admin"]),async(req,res)=>{
    res.json({message:"welcome admin! you have full access"});
})

securerouter.get("/routes/doctor",userauth,roleaccess(["doctor"]),async(req,res)=>{
    res.json({message:"Doctor dashboard access granted"});
})

securerouter.get("/routes/chat",userauth,roleaccess(["admin","patient","doctor"]),async(req,res)=>{
    res.json({message:"Chatbot says:Hello there!"});
})

module.exports=securerouter;
