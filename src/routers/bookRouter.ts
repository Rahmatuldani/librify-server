import express from 'express';
import {
    createBook, 
    getBooks, 
    deleteBook, 
    getPoster, 
    updateBook, 
    changePoster, 
    getPages, 
    updateStock, 
    likeBook
} from '../controllers/bookController';
import { validateBook, validateUpdateBook } from '../middlewares/validator';
import authorization from '../middlewares/authorization';
import { upload } from '../uploads';

const bookRouter = express.Router();

bookRouter.get('/', getBooks);
bookRouter.get('/pages', getPages);
bookRouter.post('/', authorization, upload.single('poster'), validateBook, createBook);
bookRouter.put('/:id', authorization, validateUpdateBook, updateBook);
bookRouter.put('/:id/changePoster', authorization, upload.single('poster'), changePoster);
bookRouter.delete('/:id', deleteBook);
bookRouter.get('/:id/poster', getPoster);
bookRouter.post('/:id/:type', likeBook);
bookRouter.put('/:id/updateStock', updateStock);

export default bookRouter;