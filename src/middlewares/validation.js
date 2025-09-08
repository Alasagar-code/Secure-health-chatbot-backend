const validator = require("validator");
const validatesignupdata = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    console.log(firstName+lastName+emailId+password);
    if(!firstName || !lastName)
    {
        throw new Error("Name is not valid");
    }
    else if(firstName.length<3 || firstName.length>20)
    {
        throw new Error("Length of the characters must between 4 to 20 characters");
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("please enter a strong password");
    }
}

const validatepassword = (password)=>{
    if(!validator.isStrongPassword(password))
    {
        throw new Error("please Enter the strong password");
    }
}
module.exports={
    validatesignupdata,
    validatepassword
}