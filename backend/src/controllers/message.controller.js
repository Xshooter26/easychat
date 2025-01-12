import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId,io } from "../lib/socket.js";

export const getUserForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } 
        }).select("-password");   //fetch everything except password
        
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Error getting user", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    
    }
};


export const getMessages = async (req, res) => {
    try{
        const { id:userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or :[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        res.status(200).json(messages)
    }catch(error){

        console.log("Error getting messages", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessage = async (req, res) => {
    try{
        const {text,image,gif} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const base64Size = Buffer.from(image, 'base64').length;
            if (base64Size > 5242880) { // 5MB limit
                return res.status(413).json({ 
                    message: "Image size should be less than 5MB" 
                });
            }
            
            //upload image to cloudinary and get the URL
            const uploadResponse = await cloudinary.uploader.upload(image, {
                upload_preset: "chat_app",
                resource_type: "auto"
            });
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
            gif

        })
        await newMessage.save();       //save to the database

      


        //realtime messaging functionality
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);


        }

    res.status(201).json(newMessage)
    }
    catch(error){
        console.log("Error sending message", error.message)
        res.status(500).json({ 
            message: "Failed to send message",
            error: error.message 
        });
    }
}