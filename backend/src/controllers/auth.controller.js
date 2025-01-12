import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //hashpassword use bcrypt.js
        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must be at least 6 characters long" });
        }

        const user = await User.findOne({ email: email });

        //check if user already exists
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating a new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            //generate jwt token here
            generateToken(newUser._id, res); //newUser._id --> this is how mongodb saves it
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async(req, res) => {
    const {email,password} = req.body;

    try {

        const user = await User.findOne({ email: email})
        if(!user){
            return res.status(400).json(
                {message : "Invalid credentials"}
            )
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json(
                {message : "Invalid credentials"}
            )
        }
        generateToken(user._id, res); //user._id --> this is how mongodb saves it

        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
                });
    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
};
export const logout = (req, res) => {
   try{
    res.cookie("jwtToken","",{maxAge:0});
    res.status(200).json({message:"Your have Successfully logged out"})
   }
   catch(error){
       console.log("Error in logout controller: ", error.message);
       res.status(500).json({ message: "Internal Server Error" });
   }
};


export const updateProfile = async (req, res) => {

    try{
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message:"Profile Pic is required"})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updateUser = await User.findByIdAndUpdate(
            userId,{profilePic:uploadResponse.secure_url},{new:true})

            res.status(200).json(updateUser)

    }
    catch(error){
        console.log("Error in updateProfile controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAuth = (req,res)=>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in checkAuth controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}