// src/routes/product.routes.ts
import express from 'express'
import { createProduct, getAllProducts } from '../controllers/product.controller'

const router = express.Router()

// POST /api/products
router.post('/', createProduct)

// GET /api/products
router.get('/', getAllProducts)

export default router
