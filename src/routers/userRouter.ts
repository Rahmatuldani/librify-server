import express from 'express';
import { deleteUsers, getAvatar, getUsers } from '../controllers/userController';
import authorization from '../middlewares/authorization';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id/avatar', getAvatar);
userRouter.delete('/:id', authorization, deleteUsers);

export default userRouter;