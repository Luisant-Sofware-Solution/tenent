import express from 'express';
import { createUser } from '../controllers/user.controller';

const router = express.Router();

// Mount route correctly
router.post('/', createUser);

export default router;
