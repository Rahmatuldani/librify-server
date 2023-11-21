import { IUser, UserModel } from "../models/user"
import { Encrypt } from "../utils/encrypt";
import response from '../utils/response';
import fs from 'fs';
import path from 'path';

async function verifyEmail(req:any, res: any) {
    const { token } = req.query;
    
    try {
        const user = await UserModel.findOne({ verificationToken: token })

        if (!user) {
            return response(res, { status: 404, message: 'Invalid verification token' })
        }

        user.verified = true;
        user.verificationToken = '';
        await user.save();

        return response(res, { message: 'Accound verified success' })
    } catch (error) {
        return response(res, { status: 500, message: `Verify user failed ${error}` })
    }
}

async function getUsers(req: any, res: any) {
    try {
        const users: IUser[] = await UserModel.find().select('-password -createdAt -updatedAt -ktp');

        return response(res, { message: 'Get users success', data: { users } })
    } catch (error) {
        return response(res, { status: 500, message: `Get users failed : ${error}` })
    }
}

async function updatePassword(req: any, res: any) {
    const { id } = req.params;
    const { password, newPassword } = req.body;

    if (!password || !newPassword) {
        return response(res, { status: 400, message: 'password and newPassword required' });
    }

    try {
        const encryptPass = Encrypt(password);
        const encryptNewPass = Encrypt(newPassword);
        const user = await UserModel.findOne({ _id: id });
        
        if (!user) {
            return response(res, { status: 404, message: 'User not found' });
        }

        if (user.password !== encryptPass) {
            return response(res, { status: 400, message: 'User password is incorrect' });
        }

        user.password = encryptNewPass;
        
        await user.save();

        return response(res, { message: 'Update user success' })
    } catch (error) {
        return response(res, { status: 500, message: `Update user password failed : ${error}` })
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

async function getKtp(req: any, res: any) {
    const { id } = req.params;
    try {
        const file = path.join(__dirname, '../uploads/ktp/', id)
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
    getAvatar,
    getKtp,
    updatePassword,
    verifyEmail
}