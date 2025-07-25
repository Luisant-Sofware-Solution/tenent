import { Router } from 'express';
import { createSuperAdmin, getSuperAdmins } from '../controllers/superadmin.controller';

const router = Router();

router.post('/', createSuperAdmin);
router.get('/', getSuperAdmins);

export default router;
