import multer from "multer";
import path from "path";
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadSubdirectory = file.fieldname; // Use the field name as the subdirectory
        const uploadPath = path.join(__dirname, '/uploads', uploadSubdirectory);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true })
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const id = req.body.email ? req.body.email : req.body.isbn ? req.body.isbn : req.params['id'];
        const random = Math.round(Math.random() * 1e9)
        cb(null, file.fieldname + '-' + id + random + fileExtension);
    },
});

export const upload = multer({ storage: storage })