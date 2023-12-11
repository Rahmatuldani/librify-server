import express from 'express';
import { addBorrow, changeStatus, deleteBorrow, getAllBorrow, getBorrow } from '../controllers/borrowController';
import { validateBorrow } from '../middlewares/validator';
import authorization from '../middlewares/authorization';

const borrowRoute = express.Router();

borrowRoute.get('/', authorization, getAllBorrow);
borrowRoute.get('/:id', getBorrow);
borrowRoute.post('/:id/changeStatus', changeStatus);
borrowRoute.post('/', authorization, validateBorrow, addBorrow);
borrowRoute.delete('/', deleteBorrow);

export default borrowRoute;