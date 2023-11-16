import express from 'express';
import bookRouter from './bookRouter';
import authRouter from './authRouter';
import userRouter from './userRouter';
import borrowRoute from './borrowRouter';
import path from 'path';
import fs from 'fs';
import response from '../utils/response';

const routers = express.Router();

routers.use('/auth', authRouter);
routers.use('/users', userRouter);
routers.use('/books', bookRouter);
routers.use('/borrows', borrowRoute);
routers.get('/images/avatar/:id', (req, res) => {
    const { id } = req.params;
    try {
        
    } catch (error) {
        
    }
})

export default routers;