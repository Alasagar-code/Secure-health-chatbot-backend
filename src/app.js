const express = require("express");
const authrouter = require("./routes/auth.js");
const securerouter = require("./routes/secure.js");
const {router} = require("./middlewares/authmiddleware.js");
const cookieparser = require("cookie-parser");
const secureroute = require("./routes/secure.js");
const router1 = require("./routes/profile.js");
const app = express();

app.use(express.json());
app.use(cookieparser());
app.use("/",authrouter);
app.use("/",router);
app.use("/",secureroute);
app.use("/profile",router1);

module.exports=app;


