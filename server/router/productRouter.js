import express from 'express';
import * as controller from '../controller/productController.js';

const router = express.Router();

router
    .post('/all', controller.getProducts)    
    .get('/:id', controller.getProduct)
    .post('/new', controller.insert);


export default router;
