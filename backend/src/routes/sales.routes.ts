import express from 'express'
import { createSales } from '../controllers/sales.controller'

const router = express.Router()

// POST /api/sales
router.post('/', createSales)

// GET /api/sales
// router.get('/', getAllSales)

export default router
