import { Router } from 'express';
import { createTax, getTaxes } from '../controllers/tax.controller';

const router = Router();

router.post('/', createTax);
router.get('/', getTaxes);

export default router;
