import { IUser, UserModel } from "../models/user"
import response from '../utils/response';
import fs from 'fs';
import path from 'path';

async function getUsers(req: any, res: any) {
    try {
        const users: IUser[] = await UserModel.find().select('-password -createdAt -updatedAt -ktp');

        return response(res, { message: 'Get users success', data: { users } })
    } catch (error) {
        return response(res, { status: 500, message: `Get users failed : ${error}` })
    }
}

async function deleteUsers(req: any, res: any) {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);

        if (!user) {
            return response(res, { status: 404, message: 'User not found' })
        }

        const ktpPath = path.join(__dirname, '../uploads/ktp', user.ktp);

        fs.stat(ktpPath, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    return response(res, { status: 404, message: 'File not found' });
                } else {
                    return response(res, { status: 500, message: `${err}`});
                }
            }

            fs.unlink(ktpPath, (err) => {
                if (err) {
                    return response(res, { status: 500, message: `${err}`});
                }
            });
        });

        await UserModel.findByIdAndDelete(id);

        return response(res, { message: 'Delete users success' })
    } catch (error) {
        return response(res, { status: 500, message: `Delete users failed ${error}` })
    }
}

async function getAvatar(req: any, res: any) {
    const { id } = req.params;
    try {
        const file = path.join(__dirname, '../uploads/avatar/', id)
        if (!file) {
            return response(res, { status: 404, message: 'File not found' })
        }
        return res.sendFile(file)
    } catch (error) {
        return response(res, { status: 500, message: `Get user avatar failed ${error}` })
    }
}

export {
    getUsers,
    deleteUsers,
    getAvatar
}