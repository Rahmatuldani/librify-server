import express from 'express';
import bookRouter from './bookRouter';
import authRouter from './authRouter';
import userRouter from './userRouter';
import borrowRoute from './borrowRouter';

const routers = express.Router();

routers.use('/auth', authRouter);
routers.use('/users', userRouter);
routers.use('/books', bookRouter);
routers.use('/borrows', borrowRoute);
// routers.post('/uploads', upload.single('avatar'), (req: any, res: any) => {
//     const file = req.file;
//     if (!file) {
//         return res.json({
//             message: 'error file null',
//         })
//     }

//     try {
//         return res.json({
//             message: 'success',
//             file
//         })
//     } catch (error) {
//         return res.json({
//             message: 'error',
//             error
//         })
//     }
// })

export default routers;