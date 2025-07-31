import { Request, Response } from 'express';
import { createUserForCompany } from '../services/user.service';

export async function createUser(req: Request, res: Response) {
  try {
    const result = await createUserForCompany(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
