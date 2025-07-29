import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'

// ✅ Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') })

// ✅ Create Express app
const app = express()
const PORT = process.env.PORT || 3001

// ✅ Middlewares
app.use(cors({ origin: true, credentials: true })) // Allow CORS
app.use(express.json()) // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })) // Parse form-urlencoded data

// ✅ Route Imports
import superAdminRoutes from './routes/superadmin.routes'
import companyRoutes from './routes/company.routes'
import userRoutes from './routes/user.routes'
import categoryRoutes from './routes/category.routes'
import unitRoutes from './routes/unit.routes'
import taxRoutes from './routes/tax.routes'
import productRoutes from './routes/product.routes'
import salesRoutes from './routes/sales.routes'

// ✅ Use Routes
app.use('/api/superadmin', superAdminRoutes)
app.use('/api/companies', companyRoutes)
app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/units', unitRoutes)
app.use('/api/taxes', taxRoutes)
app.use('/api/products', productRoutes)
app.use('/api/sales', salesRoutes)

// ✅ Health check route
app.get('/', (_req, res) => {
  res.send('🚀 SuperAdmin Multi-Tenant Backend is running!')
})

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
