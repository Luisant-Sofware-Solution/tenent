// src/routes/user.route.ts
import express from 'express';
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import { loginUser } from '../controllers/login.controller'; // ✅ Use correct login controller

const router = express.Router();

router.post('/login', loginUser);     // POST /api/users/login
router.post('/', createUser);         // POST /api/users
router.get('/', getAllUsers);         // GET /api/users
router.patch('/:id', updateUser);     // PATCH /api/users/:id
router.delete('/:id', deleteUser);    // DELETE /api/users/:id

export default router;
