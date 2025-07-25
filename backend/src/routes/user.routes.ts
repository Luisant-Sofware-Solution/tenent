import express from 'express';
import { createUser } from '../controllers/user.controller';

const router = express.Router();

// POST /users
router.post('/', createUser);

export default router;
