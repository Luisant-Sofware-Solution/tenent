// src/routes/company.routes.ts
import { Router } from 'express';
import { createCompany, getCompanies } from '../controllers/company.controller';

const router = Router();

router.post('/companies', createCompany); // POST /api/companies
router.get('/companies', (req, res) => {
  console.log("🔥 GET /api/companies hit");
  getCompanies(req, res);
});

export default router;
