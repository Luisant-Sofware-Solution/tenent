import express from 'express'
import { createUnit } from '../controllers/unit.controller'

const router = express.Router()

// POST /api/units
router.post('/', createUnit)

export default router
