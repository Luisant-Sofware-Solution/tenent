"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/superadmin.routes.ts
const express_1 = require("express");
const superadmin_controller_1 = require("../controllers/superadmin.controller");
const router = (0, express_1.Router)();
router.post('/register', superadmin_controller_1.createSuperAdmin);
router.post('/login', superadmin_controller_1.loginSuperAdmin);
// router.get('/', getAllSuperAdmins);
exports.default = router;
