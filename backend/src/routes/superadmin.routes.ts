import { Router } from 'express'
import {
  registerSuperAdmin,
  loginSuperAdmin,
} from '../controllers/superadmin.controller'
import { verifyToken, AuthRequest } from '../middleware/auth.middleware'

const router = Router()

router.post('/register', registerSuperAdmin)
router.post('/login', loginSuperAdmin)

// ✅ Protected test route
router.get('/profile', verifyToken, (req: AuthRequest, res) => {
  res.json({ message: '🔐 Protected route accessed', user: req.user })
})

export default router
