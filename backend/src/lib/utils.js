
import jwt from "jsonwebtoken"
export const generateToken = (userId,res) =>{
    const token = jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    );


    //generate cookie token
    res.cookie("jwtToken",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000,//in ms
        httpOnly : true,
        sameSite : "strict", // or "lax", "none"
        secure : process.env.NODE_ENV !== "development"
    })


    return token;
}