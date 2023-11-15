import express from 'express';
import { addBorrow, deleteBorrow, getBorrow } from '../controllers/borrowController';
import { validateBorrow } from '../middlewares/validator';
import authorization from '../middlewares/authorization';

const borrowRoute = express.Router();

borrowRoute.get('/', getBorrow);
borrowRoute.post('/', authorization, validateBorrow, addBorrow);
borrowRoute.delete('/', deleteBorrow);

export default borrowRoute;