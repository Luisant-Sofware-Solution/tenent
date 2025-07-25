// src/routes/superadmin.routes.ts
import { Router } from 'express';
import {
  createSuperAdmin,
  loginSuperAdmin,
  // getAllSuperAdmins
} from '../controllers/superadmin.controller';

const router = Router();

router.post('/register', createSuperAdmin);
router.post('/login', loginSuperAdmin);
// router.get('/', getAllSuperAdmins);

export default router;
