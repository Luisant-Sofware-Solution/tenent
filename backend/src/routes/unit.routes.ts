import { Router } from 'express';
import { createUnit, getUnits } from '../controllers/unit.controller';

const router = Router();

router.post('/', createUnit);
router.get('/', getUnits);

export default router;
