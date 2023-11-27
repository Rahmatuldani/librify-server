import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    avatar: string;
    ktp: string;
    password: string;
    verified: boolean;
    verificationToken: string;
}

const userSchema = new mongoose.Schema<IUser>({
    name: String,
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
    verificationToken: String,
}, {
    versionKey: false,
    timestamps: true,
})

const UserModel = mongoose.model<IUser>('User', userSchema);

export { UserModel, IUser };