// src/controllers/customer.controller.ts

import { Request, Response } from 'express'
import prisma from '../db/client'

// 👉 POST /customers - Create a customer
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const {
      name,
      mobileNo,
      city,
      userId,
      modifiedUserId
    } = req.body

    // Foreign key check (optional)
    const userExists = await prisma.user.findUnique({ where: { id: userId } })
    if (!userExists) {
      return res.status(400).json({ success: false, message: 'User not found' })
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        mobileNo,
        city,
        userId,
        modifiedUserId,
      }
    })

    res.status(201).json({ success: true, data: customer })
  } catch (error) {
    console.error('Create Customer Error:', error)
    res.status(500).json({ success: false, message: 'Failed to create customer' })
  }
}

// 👉 GET /customers - Get all customers
export const getAllCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        user: true
      }
    })

    res.status(200).json({ success: true, data: customers })
  } catch (error) {
    console.error('Get Customers Error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch customers' })
  }
}
