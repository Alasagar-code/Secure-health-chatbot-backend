const app = require("./app.js");
const connectDB = require("./config/database.js");
require("dotenv").config();

const PORT = process.env.PORT;
connectDB()
.then(()=>{
    console.log("Database is connected successfully");
    app.listen(PORT,()=>{
        console.log("App is listening on port 5000");
    });
})
.catch((error)=>{
    console.log("Database is not connected"+error.message);
})