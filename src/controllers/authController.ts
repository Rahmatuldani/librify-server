import { IUser, UserModel } from "../models/user";
import Hashes from 'object-hash';
import response from "../utils/response";
import fs from 'fs';
import path from 'path';

async function register(req: any, res: any) {
    const { nik, name, email, password } = req.body;
    const encryptPassword = Hashes(password, { algorithm: 'sha3-512', encoding: 'base64' })
    const defaultAvatar = path.join(__dirname, '../public', 'blank-avatar.png')
    
    if (!req.file) {
        return response(res, { status: 400, message: 'ktp is required' })
    }
    
    try {
        const data = fs.readFileSync(defaultAvatar);
        const bufferAvatar: Buffer = Buffer.from(data);

        const user: IUser = await UserModel.create({
            nik, 
            name, 
            email, 
            password: encryptPassword,
            avatar: bufferAvatar,
        })

        const newUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        }
        
        return response(res, { message: 'Register success', data: {user: newUser} })
    } catch (error) {
        return response(res, { status: 500, message: `${error}` })
    }
}

async function login(req: any, res: any) {
    const { email, password } = req.body;

    try {
        const user: IUser | null = await UserModel.findOne({ email })

        const encryptPassword = Hashes(password, { algorithm: 'sha3-512', encoding: 'base64' });

        if (user?.password !== encryptPassword) {
            return response(res, { status: 400, message: 'Password is incorrect' })
        }

        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        }
        return response(res, { message: 'Login success', data: {user: userData} })
    } catch (error) {
        return response(res, { status: 500, message: `Login failed ${error}` });
    }
}

export { 
    login,
    register
};