import { Request, Response } from 'express';
import prisma from '../db/client'; // Adjust path based on your structure

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, mobileNo, city, userId } = req.body;

    const customer = await prisma.customer.create({
      data: {
        name,
        mobileNo,
        city,
        user: {
          connect: { id: userId } // Ensures the user exists
        }
      }
    });

    res.status(201).json(customer);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany({
      include: { user: true } // optional: to include user info
    });
    res.json(customers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
