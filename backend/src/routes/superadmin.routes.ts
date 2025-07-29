// src/routes/superadmin.routes.ts
import { Router } from 'express'
import { registerSuperAdmin, loginSuperAdmin } from '../controllers/superadmin.controller'

const router = Router()

router.post('/register', registerSuperAdmin)
router.post('/login', loginSuperAdmin)

export default router
