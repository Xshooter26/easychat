import express from 'express';
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.middleware.js';


const router = express.Router();

router.post('/signup',signup);

router.post('/login',login);
router.post('/logout',logout);



// The protectRoute middleware is essential for maintaining
//  the security and integrity of user profile updates in a
//   web application. It ensures that only authenticated and
//    authorized users can access sensitive routes, thereby 
//    protecting user data from unauthorized access.
router.put("/update-profile",protectRoute,updateProfile);

router.get("/check",protectRoute,checkAuth)


export default router;