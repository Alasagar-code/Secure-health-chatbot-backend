const roleaccess = (allowed_roles)=>async(req,res,next)=>{
    if(!req.user || !req.user.role)
    {
        return res.status(401).json({
            message:"User not authenticated",
        })
    }
    if(!allowed_roles.includes(req.user.role))
    {
        return res.status(403).json({
            message:"access forbidden:insufficient role"
        })
    }
    next();
}
module.exports=roleaccess;