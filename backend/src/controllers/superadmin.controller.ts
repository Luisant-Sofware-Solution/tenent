import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient, Prisma } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

export const registerSuperAdmin = async (req: Request, res: Response) => {
  const { email, password, name } = req.body
  if (!email || !password || !name) return res.status(400).json({ error: 'All fields are required' })

  try {
    const existing = await prisma.superAdmin.findUnique({ where: { email } })
    if (existing) return res.status(409).json({ error: 'SuperAdmin already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const newAdmin = await prisma.superAdmin.create({
      data: { email, password: hashedPassword, name, role: 'SUPERADMIN' },
    })

    res.status(201).json({ message: 'SuperAdmin registered', data: newAdmin })
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('⚠️ Prisma error:', error.message)
    } else {
      console.error('❌ Unknown error:', error)
    }
    res.status(500).json({ error: 'Something went wrong during registration' })
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
      throw new Error('JWT_SECRET is not defined in the environment')
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

    res.status(200).json({
      message: '✅ Login successful',
      token,
      superadmin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    })
  } catch (err) {
    console.error('❌ Login error:', err)
    res.status(500).json({ error: 'Failed to login' })
  }
}