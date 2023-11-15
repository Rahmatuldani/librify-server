import express from 'express';
import { login, register } from '../controllers/authController';
import { validateLogin, validateRegister } from '../middlewares/validator';

const authRouter = express.Router();

authRouter.post('/login', validateLogin, login)
authRouter.post('/register', validateRegister, register)

export default authRouter;