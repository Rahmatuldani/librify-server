import { IUser, UserModel } from "../models/user"
import response from '../utils/response';

async function getUsers(req: any, res: any) {
    try {
        const users: IUser[] = await UserModel.find().select('-password -createdAt -updatedAt');
        
        return response(res, { message: 'Get users success', data: { users } })
    } catch (error) {
        return response(res, { status: 500, message: `Get users failed : ${error}` })
    }
}

async function deleteUsers(req: any, res: any) {
    try {
        await UserModel.deleteMany();

        return response(res, { message: 'Delete users success' })
    } catch (error) {
        return response(res, { status: 500, message: `Delete users failed ${error}` })
    }
}

export {
    getUsers,
    deleteUsers,
}