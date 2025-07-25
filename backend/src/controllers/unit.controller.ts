import { Request, Response } from 'express'
import prisma from '../db/client'

export const createUnit = async (req: Request, res: Response) => {
  try {
    const { name, decimalNOs, companyId } = req.body

    if (!name || decimalNOs === undefined || !companyId) {
      return res.status(400).json({ error: 'name, decimalNOs, and companyId are required' })
    }

    const company = await prisma.company.findUnique({
      where: { id: Number(companyId) },
    })

    if (!company) {
      return res.status(404).json({ error: 'Company not found' })
    }

    const unit = await prisma.unit.create({
      data: {
        name,
        decimalNOs: Number(decimalNOs),
        company: {
          connect: { id: Number(companyId) },
        },
      },
    })

    return res.status(201).json(unit)
  } catch (error) {
    console.error('Error creating unit:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
