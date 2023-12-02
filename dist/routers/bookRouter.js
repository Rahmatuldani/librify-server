"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const validator_1 = require("../middlewares/validator");
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const uploads_1 = require("../uploads");
const bookRouter = express_1.default.Router();
bookRouter.get('/', bookController_1.getBooks);
bookRouter.post('/', authorization_1.default, uploads_1.upload.single('poster'), validator_1.validateBook, bookController_1.createBook);
bookRouter.put('/:id', authorization_1.default, validator_1.validateUpdateBook, bookController_1.updateBook);
bookRouter.put('/:id/changePoster', authorization_1.default, uploads_1.upload.single('poster'), bookController_1.changePoster);
bookRouter.delete('/:id', bookController_1.deleteBook);
bookRouter.get('/:id/poster', bookController_1.getPoster);
exports.default = bookRouter;
