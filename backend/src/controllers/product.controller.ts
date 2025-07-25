// src/controllers/product.controller.ts
import { Request, Response } from 'express'
import prisma from '../db/client'

// ✅ Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      itemCode,
      itemName,
      shortCode,
      printName,
      hsnCode,
      categoryId,
      unitId,
      taxId,
      prate,
      srate,
      mrp,
      userId,
      modifiedUserId,
      imageSaveInLocation,
      companyId,
    } = req.body

    // ⚠️ Ensure foreign keys exist: User, Category, Unit, Tax, Company
    const product = await prisma.product.create({
      data: {
        itemCode,
        itemName,
        shortCode,
        printName,
        hsnCode,
        prate,
        srate,
        mrp,
        isActive: true,
        createdDate: new Date(),
        modifiedDate: new Date(),
        modifiedUserId, // optional scalar
        imageSaveInLocation,

        // 🔗 Foreign key relations
        category: { connect: { id: categoryId } },
        unit: { connect: { id: unitId } },
        tax: { connect: { id: taxId } },
        user: { connect: { id: userId } },
        company: { connect: { id: companyId } },
      },
    })

    res.status(201).json({ success: true, data: product })
  } catch (err: any) {
    console.error('Create Product Error:', err)

    // Specific Prisma error handling
    if (err.code === 'P2025') {
      return res.status(400).json({
        success: false,
        message: 'Invalid foreign key references',
      })
    }

    res.status(500).json({ success: false, message: 'Failed to create product' })
  }
}

// ✅ Get all products
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        unit: true,
        tax: true,
        user: true,
        company: true,
      },
    })

    res.status(200).json({ success: true, data: products })
  } catch (err) {
    console.error('Get Products Error:', err)
    res.status(500).json({ success: false, message: 'Failed to fetch products' })
  }
}
