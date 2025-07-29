import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

export const registerSuperAdmin = async (req: Request, res: Response) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const existing = await prisma.superAdmin.findUnique({ where: { email } })
    if (existing) {
      return res.status(409).json({ error: 'SuperAdmin already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newAdmin = await prisma.superAdmin.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'SUPERADMIN',
      },
    })

    return res.status(201).json({
      message: '✅ SuperAdmin registered successfully',
      superadmin: {
        id: newAdmin.id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    })
  } catch (error) {
    console.error('❌ Error during registration:', error)
    return res.status(500).json({ error: 'Something went wrong during registration' })
  }
}

export const loginSuperAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    const admin = await prisma.superAdmin.findUnique({ where: { email } })
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const secret = process.env.JWT_SECRET
    if (!secret) {
      return res.status(500).json({ error: 'JWT_SECRET not configured' })
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
      secret,
      { expiresIn: '2h' }
    )

    return res.status(200).json({
      message: '✅ Login successful',
      token,
      superadmin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt,
      },
    })
  } catch (err) {
    console.error('❌ Login error:', err)
    return res.status(500).json({ error: 'Failed to login' })
  }
}

