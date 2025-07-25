import { Router } from 'express';
import {
  createCompany,
  getCompanies,
  getCompanyByTenantId,
} from '../controllers/company.controller';

const router = Router();

router.post('/companies', createCompany);
router.get('/companies', getCompanies);
router.get('/companies/:tenantId', getCompanyByTenantId);

export default router;
