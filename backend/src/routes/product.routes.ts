// src/routes/product.routes.ts
import express from 'express';
import { createProduct, getAllProducts } from '../controllers/product.controller';

const router = express.Router();

// This is the likely error line:
router.get('/', getAllProducts); // <- Check if `getAllProducts` is really a function

router.post('/', createProduct);

export default router;