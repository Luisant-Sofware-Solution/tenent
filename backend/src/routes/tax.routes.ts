import express from 'express'
import { createTax } from '../controllers/tax.controller'

const router = express.Router()

// POST /api/taxes
router.post('/', createTax)

export default router
