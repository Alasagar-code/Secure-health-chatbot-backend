const express = require("express");
const router = express.Router();
const Users = require("../models/users.js")
const {userauth} = require("../middlewares/authmiddleware.js");

router.post("/update",userauth,async(req,res)=>{
    try{
            const {firstName,lastName} = req.body;
            const _id=req.user.id;
            const updated_data = await Users.findByIdAndUpdate(_id,
                {firstName,
                lastName},
                {new:true}  //It returns the users before update
            ).select("-password");
            res.json({
                updated_data,
                message:"update successfully"
            })
    }
    catch(error){
        console.error("profile update error:",err);
        res.status(400).json({
            message:"server Error",
        })
    }
})

module.exports=router;