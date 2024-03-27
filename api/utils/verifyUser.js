import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js";


export const verifyToken=(req,res,next)=>{
    console.log(req.cookies);
    const token= req.cookies.access_token;
    console.log(token);
    if(!token){
        return next(errorHandler(401,"you are not authenticated!"))
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorHandler(403,"Token is not valid"))
        }
        console.log(user);
        req.user=user
        next();
    })

}