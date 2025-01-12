import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async(req,res,next) => {
    try{
        const jwtToken = req.cookies.jwtToken;

        if(!jwtToken){
            return res.status(401).json({message: "You are not authenticated"});
        }

        const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);

        if(!decode){
            return res.status(401).json({message: "You are not authenticated Invalid Token: " 
                + jwtToken});
        }

        const user = await User.findById(decode.userId).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        req.user = user; //user is authenticated
        next();

    }
    catch(error){
        console.log("Error in protect route middleware: ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};