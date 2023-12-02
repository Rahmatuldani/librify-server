import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    role: string;
    email: string;
    avatar: string;
    ktp: string;
    password: string;
    verified: boolean;
    adminVerified: boolean;
    verificationToken: string;
}

const userSchema = new mongoose.Schema<IUser>({
    name: String,
    role: {
        type: String,
        default: 'user',
    },
    email: String,
    password: String,
    avatar: {
        type: String,
        default: null
    },
    ktp: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    adminVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
}, {
    versionKey: false,
    timestamps: true,
})

const UserModel = mongoose.model<IUser>('User', userSchema);

export { UserModel, IUser };