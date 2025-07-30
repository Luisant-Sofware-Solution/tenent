// src/routes/company.routes.ts
import express from 'express';
import { createCompany, getCompany } from '../controllers/company.controller';

const router = express.Router();

router.post('/companies', createCompany);
router.get('/company/:tenantId', getCompany);
export default router;