"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const borrowSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    book: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: 'Book',
            required: true,
        }],
    quantity: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
}, {
    versionKey: false,
});
const BorrowModel = mongoose_1.default.model('Borrow', borrowSchema);
exports.BorrowModel = BorrowModel;
