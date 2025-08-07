// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import {
  createUser as createUserService,
  getUsers,
  updateUserById,
  deleteUserById,
} from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { tenantId, name, email, password, role, companyId } = req.body;

    if (!tenantId || !name || !email || !password || !role || !companyId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await createUserService({ tenantId, name, email, password, role, companyId });
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    console.error('❌ Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.query;

    if (!tenantId || typeof tenantId !== 'string') {
      return res.status(400).json({ error: 'tenantId is required as query param' });
    }

    const users = await getUsers(tenantId);
    res.json(users);
  } catch (error) {
    console.error('❌ Error getting users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.query;
    const userId = parseInt(req.params.id);
    const data = req.body;

    if (!tenantId || typeof tenantId !== 'string') {
      return res.status(400).json({ error: 'tenantId is required as query param' });
    }

    const user = await updateUserById(tenantId, userId, data);
    res.json({ message: 'User updated', user });
  } catch (error) {
    console.error('❌ Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.query;
    const userId = parseInt(req.params.id);

    if (!tenantId || typeof tenantId !== 'string') {
      return res.status(400).json({ error: 'tenantId is required as query param' });
    }

    const user = await deleteUserById(tenantId, userId);
    res.json({ message: 'User deleted', user });
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
