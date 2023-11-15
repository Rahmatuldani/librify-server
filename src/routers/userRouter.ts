import express from 'express';
import { deleteUsers, getUsers } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.delete('/', deleteUsers);

export default userRouter;