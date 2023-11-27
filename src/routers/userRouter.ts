import express from 'express';
import { 
    deleteUsers, 
    getAvatar, 
    getKtp, 
    getUsers, 
    updatePassword, 
    verifyEmail
} from '../controllers/userController';
import authorization from '../middlewares/authorization';

const userRouter = express.Router();

userRouter.get('/', authorization, getUsers);
userRouter.put('/:id/password', updatePassword);
userRouter.get('/:id/avatar', getAvatar);
userRouter.get('/:id/ktp', getKtp);
userRouter.get('/verify', verifyEmail);
userRouter.delete('/:id', authorization, deleteUsers);

export default userRouter;