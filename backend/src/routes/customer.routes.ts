import { Router } from 'express';
import { createCustomer } from '../controllers/customer.controller';

const router = Router();

router.post('/', createCustomer);
import { getCustomers } from '../controllers/customer.controller';
router.get('/', getCustomers);

export default router;
