import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '../../prisma/generated/client'

const prisma = new PrismaClient()

export const registerSuperAdmin = async (req: Request, res: Response) => {
  const { email, password, name } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const newAdmin = await prisma.superAdmin.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'SUPERADMIN',
      },
    })

    res.status(201).json({ message: 'SuperAdmin registered', data: newAdmin })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export const loginSuperAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const admin = await prisma.superAdmin.findUnique({ where: { email } })
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' })

    res.status(200).json({ message: '✅ Login successful', superadmin: admin })
  } catch (error) {
    console.error('❌ Login error:', error)
    res.status(500).json({ error: 'Failed to login' })
  }
}
