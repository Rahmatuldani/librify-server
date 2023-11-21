import express from 'express';
import bookRouter from './bookRouter';
import authRouter from './authRouter';
import userRouter from './userRouter';
import borrowRoute from './borrowRouter';
import path from 'path';
import fs from 'fs';
import response from '../utils/response';
import authorization from '../middlewares/authorization';

const routers = express.Router();

routers.use('/auth', authRouter);
routers.use('/users', userRouter);
routers.use('/books', bookRouter);
routers.use('/borrows', borrowRoute);

export default routers;