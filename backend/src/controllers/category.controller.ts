import { Request, Response } from 'express'
import prisma from '../db/client' // Adjust this import to your Prisma client

// POST /categories
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { category, companyId } = req.body

    // Basic validation
    if (!category || !companyId) {
      return res.status(400).json({ error: 'Category and companyId are required.' })
    }

    // Optional: Check if company exists
    const company = await prisma.company.findUnique({
      where: { id: Number(companyId) },
    })

    if (!company) {
      return res.status(404).json({ error: 'Company not found.' })
    }

    const newCategory = await prisma.category.create({
      data: {
        category,
        company: {
          connect: { id: Number(companyId) },
        },
      },
    })

    return res.status(201).json(newCategory)
  } catch (error) {
    console.error('Error creating category:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
