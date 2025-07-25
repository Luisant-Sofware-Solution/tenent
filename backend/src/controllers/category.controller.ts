import { Request, Response } from 'express';
import prisma from '../db/client';

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  const { category } = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: { category },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// Get all categories
export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
