import express from 'express';
import { 
    changeAvatar,
    deleteUsers, 
    getAvatar, 
    getKtp, 
    getUsers, 
    updatePassword, 
    verifyAdmin, 
    verifyEmail
} from '../controllers/userController';
import authorization from '../middlewares/authorization';
import { upload } from '../uploads';

const userRouter = express.Router();

userRouter.get('/', authorization, getUsers);
userRouter.put('/:id/password', updatePassword);
userRouter.put('/:id/changeAvatar', upload.single('avatar'), changeAvatar);
userRouter.get('/:id/avatar', getAvatar);
userRouter.get('/:id/ktp', getKtp);
userRouter.get('/verify', verifyEmail);
userRouter.get('/verifyAdmin/:id', verifyAdmin);
userRouter.delete('/:id', authorization, deleteUsers);

export default userRouter;