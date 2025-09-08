const {signup,login,loginlimiter,logout} = require("../controllers/auth.controller.js");
const express = require("express");
const {body} = require("express-validator");
const authrouter = express.Router();

authrouter.post("/auth/signup",signup);
authrouter.post("/auth/login",
    [
        body("emailId")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid Email format"),
        body("password")
        .notEmpty().withMessage("password is required"),
    ]
    ,loginlimiter,login);
authrouter.post("/auth/logout",logout);

module.exports=authrouter;