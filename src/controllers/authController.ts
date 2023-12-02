import { sendVerification } from "../config/email";
import { IUser, UserModel } from "../models/user";
import { Encrypt } from "../utils/encrypt";
import response from "../utils/response";
import {v4 as uuidv4} from 'uuid';

async function register(req: any, res: any) {
    const { name, email, password } = req.body;
    const encryptPassword = Encrypt(password);
    
    if (!req.file) {
        return response(res, { status: 400, message: 'ktp is required' })
    }
    
    try {
        const token = uuidv4();
        await UserModel.create({
            name, 
            email, 
            password: encryptPassword,
            ktp: req.file.filename,
            verificationToken: token
        })

        const HOST = process.env.APP_HOST || 'http://20.2.89.234';
        const PORT = process.env.PORT || 5000;
        const verifyLink = `${HOST}:${PORT}/api/users/verify?token=${token}`;
        await sendVerification(email, verifyLink);
        
        return response(res, { message: 'Register success, Check your email for verification instructions.' })
    } catch (error) {
        return response(res, { status: 500, message: `${error}` })
    }
}

async function login(req: any, res: any) {
    const { email, password } = req.body;

    try {
        const user: IUser | null = await UserModel.findOne({ email })

        if (!user) {
            return response(res, { status: 404, message: 'User not found' })
        }
        
        if (!user?.verified) {
            return response(res, { status: 400, message: 'Your account not verified. Please check your email' })
        }
        
        if (!user?.adminVerified) {
            return response(res, { status: 400, message: 'Your account not verified by administrator. Please contact administrator' })
        }

        const encryptPassword = Encrypt(password);

        if (user?.password !== encryptPassword) {
            return response(res, { status: 400, message: 'Password is incorrect' })
        }

        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
        }
        return response(res, { message: 'Login success', data: {user: userData} })
    } catch (error) {
        return response(res, { status: 500, message: `Login failed ${error}` });
    }
}

async function forgotPassword(req: any, res: any) {
    const { email } = req.body;

    if(!email) {
        return response(res, { status: 400, message: 'Email is required' });
    }

    try {
        const user: IUser | null = await UserModel.findOne({ email: email })

        if(!user) {
            return response(res, { status: 404, message: 'User not found' });
        }

        const token = uuidv4();
        user.verificationToken = token;
        await user.save();

        const HOST = 'http://localhost';
        const PORT = 5173
        const verifyLink = `${HOST}:${PORT}/api/auth/forgotpassword?token=${token}`;
        await sendVerification(email, verifyLink);

        return response(res, { message: 'Forgot password success, Check your email for change password instructions.' })
    } catch (error) {
        return response(res, { status: 500, message: `Forgot password failed ${error}` });
    }
}

async function changePassword(req: any, res: any) {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await UserModel.findOne({ verificationToken: token });

        if (!user) {
            return response(res, { status: 404, message: 'Invalid token' });
        }

        const encryptPass = Encrypt(password);
        user.password = encryptPass;
        return response(res, { message: 'Change password success' })
    } catch (error) {
        return response(res, { status: 500, message: `Change password failed ${error}` });
    }
}

export { 
    login,
    register,
    forgotPassword,
    changePassword
};