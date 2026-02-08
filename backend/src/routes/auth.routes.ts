import express from 'express';
import AuthController from '../controller/authController';

const authRouter = express.Router();

authRouter.post('/google', AuthController.googleLogin);
authRouter.post('/google/register', AuthController.googleRegister);

export default authRouter;
