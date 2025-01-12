
import { Server } from "socket.io"; // Import the Server class from the socket.io library
import http from "http"; 
import express from "express"; 


const app = express();

const server = http.createServer(app);

// Initialize a new Socket.IO server with CORS configuration
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow requests from this origin
    },
});


export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

// Object to store online users, mapping userId to socket.id
const userSocketMap = {};

// Event listener for when a client connects to the Socket.IO server
io.on("connection", (socket) => {
    console.log("A user Connected to", socket.id); // Log the connection with the socket ID

    // Extract the userId from the handshake query
    const userId = socket.handshake.query.userId;

    // If userId is provided, map it to the socket.id in the userSocketMap
    if (userId) userSocketMap[userId] = socket.id;

    // Emit an event to all connected clients with the list of online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

   
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id); 
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    // Handle typing events
    socket.on("typing", ({ senderId, receiverId }) => {
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("typing", { senderId });
        }
    });

    socket.on("stop typing", ({ senderId, receiverId }) => {
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("stop typing", { senderId });
        }
    });
});


export { io, server, app };