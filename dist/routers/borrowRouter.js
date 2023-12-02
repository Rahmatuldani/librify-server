"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrowController_1 = require("../controllers/borrowController");
const validator_1 = require("../middlewares/validator");
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const borrowRoute = express_1.default.Router();
borrowRoute.get('/', borrowController_1.getBorrow);
borrowRoute.post('/', authorization_1.default, validator_1.validateBorrow, borrowController_1.addBorrow);
borrowRoute.delete('/', borrowController_1.deleteBorrow);
exports.default = borrowRoute;
