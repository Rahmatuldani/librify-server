import express from 'express';
import { createBook, getBooks, deleteBook } from '../controllers/bookController';
import { validateBook } from '../middlewares/validator';
import authorization from '../middlewares/authorization';
import { upload } from '../uploads';

const bookRouter = express.Router();

bookRouter.get('/', getBooks);
bookRouter.post('/', authorization, upload.single('poster'), validateBook, createBook);
bookRouter.delete('/', deleteBook);

export default bookRouter;