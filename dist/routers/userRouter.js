"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const uploads_1 = require("../uploads");
const userRouter = express_1.default.Router();
userRouter.get('/', authorization_1.default, userController_1.getUsers);
userRouter.put('/:id/password', userController_1.updatePassword);
userRouter.put('/:id/changeAvatar', uploads_1.upload.single('avatar'), userController_1.changeAvatar);
userRouter.get('/:id/avatar', userController_1.getAvatar);
userRouter.get('/:id/ktp', userController_1.getKtp);
userRouter.get('/verify', userController_1.verifyEmail);
userRouter.get('/verifyAdmin/:id', userController_1.verifyAdmin);
userRouter.delete('/:id', authorization_1.default, userController_1.deleteUsers);
exports.default = userRouter;
