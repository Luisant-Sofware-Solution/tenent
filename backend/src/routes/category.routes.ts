import express from 'express'
import { createCategory } from '../controllers/category.controller'

const router = express.Router()

// POST /categories
router.post('/', createCategory)

export default router
