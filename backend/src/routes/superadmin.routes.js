"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const superadmin_controller_1 = require("../controllers/superadmin.controller");
const router = (0, express_1.Router)();
router.post('/register', superadmin_controller_1.registerSuperAdmin);
router.post('/login', superadmin_controller_1.loginSuperAdmin);
exports.default = router;
