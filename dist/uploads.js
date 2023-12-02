"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadSubdirectory = file.fieldname; // Use the field name as the subdirectory
        const uploadPath = path_1.default.join(__dirname, '/uploads', uploadSubdirectory);
        if (!fs_1.default.existsSync(uploadPath)) {
            fs_1.default.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileExtension = path_1.default.extname(file.originalname);
        const id = req.body.email ? req.body.email : req.body.isbn ? req.body.isbn : req.params['id'];
        const random = Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + id + random + fileExtension);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
