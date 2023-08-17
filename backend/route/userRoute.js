import express from 'express';
import { authUser, logoutUser, oauthUser, registerUser } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRoute = express.Router();

userRoute.route('/oauth').post(oauthUser);

userRoute.route('/register').post(registerUser);

userRoute.route('/logout').post(protect, logoutUser);

userRoute.route('/auth').post(authUser);



export default userRoute;

