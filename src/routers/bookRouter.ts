import express from 'express';
import { createBook, getBooks, deleteBook } from '../controllers/bookController';
import { validateBook } from '../middlewares/validator';
import authorization from '../middlewares/authorization';

const bookRouter = express.Router();

bookRouter.get('/', getBooks);
bookRouter.post('/', authorization, validateBook, createBook);
bookRouter.delete('/', deleteBook);

export default bookRouter;