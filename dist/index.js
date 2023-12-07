"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/db");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./routers"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        url: 'http://localhost:5000/api',
        authorization: {
            Bearer: 'secretpassword',
        },
        node: {
            auth: {
                path: '/auth',
                login: {
                    path: '/login',
                    method: 'POST',
                    body: {
                        email: 'type string, email, required',
                        password: 'type string, min length 6 characters long, required'
                    }
                },
                register: {
                    path: '/register',
                    method: 'POST',
                    header: {
                        ContentType: 'multipart/form-data'
                    },
                    body: {
                        name: 'type string, required',
                        email: 'type string, email, required',
                        password: 'type string, min length 6 characters long, required',
                        ktp: 'type file, required'
                    }
                },
                forgotPassword: {
                    path: '/forgotpassword',
                    method: 'PUT',
                    body: {
                        email: 'type string, required'
                    }
                },
                changePassword: {
                    path: '/changepassword/:token',
                    method: 'PUT',
                    body: {
                        password: 'type string, required'
                    }
                }
            },
            users: {
                path: '/users',
                getUsers: {
                    path: '/',
                    method: 'GET',
                    authorization: true,
                },
                updatePassword: {
                    path: '/:id/password',
                    method: 'PUT',
                    body: {
                        password: 'type string, required',
                        newPassword: 'type string, required'
                    }
                },
                getAvatar: {
                    path: '/:avatar/avatar',
                    methot: 'GET',
                },
                updateAvatar: {
                    path: '/:id/changeAvatar',
                    method: 'PUT',
                    body: {
                        avatar: 'type file, required'
                    }
                }
            },
            books: {
                getBooks: {
                    path: '/books',
                    method: 'GET'
                },
                addBook: {
                    path: '/books',
                    method: 'POST',
                    authorization: true,
                    body: {
                        isbn: 'type number, unique, required',
                        year: 'type number, required',
                        title: 'type string, required',
                        genre: 'type string[], required',
                        author: 'type string[], required',
                        publisher: 'type string, required',
                        desc: 'type string, required',
                        price: 'type number, required',
                        poster: 'type file, required'
                    }
                },
                getPoster: {
                    path: '/:poster/poster',
                    method: 'GET'
                }
            },
            borrows: {
                getBorrows: {
                    path: '/borrows',
                    method: 'GET',
                },
                addBorrow: {
                    path: '/borrows',
                    method: 'POST',
                    authorization: true,
                    body: {
                        userId: 'type string, required',
                        books: [{
                                book: 'type string required',
                                quantity: 'type number, required'
                            }],
                    }
                }
            }
        }
    });
}));
app.use('/api', routers_1.default);
app.listen(port, () => console.log(`Server listen on ${port}`));
