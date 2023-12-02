"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypt = void 0;
const object_hash_1 = __importDefault(require("object-hash"));
function Encrypt(data) {
    const encrypt = (0, object_hash_1.default)(data, { algorithm: 'sha3-512', encoding: 'base64' });
    return encrypt;
}
exports.Encrypt = Encrypt;
