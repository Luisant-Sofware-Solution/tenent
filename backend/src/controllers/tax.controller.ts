import { Request, Response } from 'express'
import prisma from '../db/client'

export const createTax = async (req: Request, res: Response) => {
  try {
    const { taxName, percentage, companyId } = req.body

    if (!taxName || !percentage || !companyId) {
      return res.status(400).json({ error: 'taxName, percentage, and companyId are required' })
    }

    const company = await prisma.company.findUnique({
      where: { id: Number(companyId) },
    })

    if (!company) {
      return res.status(404).json({ error: 'Company not found' })
    }

    const tax = await prisma.tax.create({
      data: {
        taxName,
        percentage,
        company: {
          connect: { id: Number(companyId) },
        },
      },
    })

    res.status(201).json(tax)
  } catch (error) {
    console.error('Error creating tax:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
