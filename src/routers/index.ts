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
routers.post('/uploads', (req: any, res: any) => {    
    const defaultAvatar = path.join(__dirname, '../public', 'blank-avatar.png')
    try {
        const data = fs.readFileSync(defaultAvatar);
        const bufferAvatar = Buffer.from(data)
        
        return response(res, { message: 'buffer image success', data: {bufferAvatar}})
    } catch (error) {
        return response(res, { status: 500, message: `error buffer image ${error}`})
    }
})

export default routers;