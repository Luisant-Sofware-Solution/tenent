import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import {
  createCompany,
  getCompanies,
  getCompanyById,
  patchCompanyById,
  deleteCompanyById
} from '../controllers/company.controller';

const router = Router();

// Auth
router.post('/login', login);

// Company
router.post('/companies', createCompany);
router.get('/companies', getCompanies);
router.get('/companies/:id', getCompanyById);
router.patch('/companies/:id', patchCompanyById);
router.delete('/companies/:id', deleteCompanyById);

export default router;
