import express from 'express';
import { changePassword, forgotPassword, login, register } from '../controllers/authController';
import { validateLogin, validateRegister } from '../middlewares/validator';
import { upload } from '../uploads';

const authRouter = express.Router();

authRouter.post('/login', validateLogin, login)
authRouter.post('/register', upload.single('ktp'), validateRegister, register)
authRouter.put('/forgotpassword', forgotPassword)
authRouter.put('/changePassword/:token', changePassword)

export default authRouter;