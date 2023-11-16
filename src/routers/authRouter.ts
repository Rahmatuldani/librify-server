import express from 'express';
import { login, register } from '../controllers/authController';
import { validateLogin, validateRegister } from '../middlewares/validator';
import { upload } from '../uploads';

const authRouter = express.Router();

authRouter.post('/login', validateLogin, login)
authRouter.post('/register', upload.single('ktp'), validateRegister, register)

export default authRouter;