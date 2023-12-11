import './config/db';
import express from 'express';
import cors from 'cors';
import routers from './routers';
require('dotenv').config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', async (req: any, res: any) => {
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
                },
                verifyEmail: {
                    path: '/verify',
                    method: 'GET'
                },
                verifyAdmin: {
                    path: '/vrifyAdmin/:id',
                    method: 'GET'
                },
                getKtp: {
                    path: '/:id/ktp'
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
                },
                likeBook: {
                    path: '/:bookId/:type[like or unlike]',
                    method: 'POST',
                    body: {
                        userId: 'type string required'
                    }
                }
            },
            borrows: {
                path: '/borrows',
                getAllBorrows: {
                    path: '/',
                    method: 'GET',
                    authorizaton: true,
                },
                getBorrow: {
                    path: '/:userId',
                    method: 'GET'
                },
                addBorrow: {
                    path: '/',
                    method: 'POST',
                    authorization: true,
                    body: {
                        userId: 'type string, required',
                        books: [{
                            book: 'type string required',
                            quantity: 'type number, required'
                        }],
                    }
                },
                changeStatus: {
                    path: '/:borrowId/changeStatus',
                    method: 'POST',
                    body: {
                        status: 'type string required'
                    }
                }
            }
        }
    });
});

app.use('/api', routers)

app.listen(port, () => console.log(`Server listen on ${port}`));
