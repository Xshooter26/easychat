import express from 'express';
import { protectRoute } from '../middleware/protectRoute.middleware.js';
import { getMessages, getUserForSideBar, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();
router.get("/users", protectRoute,getUserForSideBar);
router.get("/:id", protectRoute, getMessages);

// Send message to specific user
router.post("/send/:id", protectRoute, sendMessage);

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});
export default router;