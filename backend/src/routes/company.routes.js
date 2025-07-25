"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_controller_1 = require("../controllers/company.controller");
const router = (0, express_1.Router)();
router.post('/companies', company_controller_1.createCompany);
router.get('/companies', company_controller_1.getCompanies);
router.get('/companies/:tenantId', company_controller_1.getCompanyByTenantId);
exports.default = router;
