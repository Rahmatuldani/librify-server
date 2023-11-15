import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    nik: string;
    name: string;
    email: string;
    avatar: Buffer;
    // ktp: Buffer;
    password: string;
}

const userSchema = new mongoose.Schema<IUser>({
    nik: String,
    name: String,
    email: String,
    password: String,
    avatar: {
        type: Buffer,
        required: true
    },
    // ktp: Buffer,
}, {
    versionKey: false,
    timestamps: true,
})

const UserModel = mongoose.model<IUser>('User', userSchema);

export { UserModel, IUser };