// server.ts
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
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ✅ Route Imports
import superAdminRoutes from './routes/superadmin.routes'
import companyRoutes from './routes/company.routes'
// Import other routes
import userRoutes from './routes/user.routes'
import categoryRoutes from './routes/category.routes'
import unitRoutes from './routes/unit.routes'
import taxRoutes from './routes/tax.routes'
import productRoutes from './routes/product.routes'
import salesRoutes from './routes/sales.routes'

// ✅ Use Routes
app.use('/api/superadmin', superAdminRoutes)
app.use('/api', companyRoutes);
console.log('Company routes mounted at /api');
app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/units', unitRoutes)
app.use('/api/taxes', taxRoutes)
app.use('/api/products', productRoutes)
app.use('/api/sales', salesRoutes)

// ✅ Health check
app.get('/', (_req, res) => {
  res.send('🚀 Server is running');
});

// // ✅ 404 fallback
// app.use('*', (req, res) => {
//   res.status(404).json({ error: `Route ${req.originalUrl} not found` });
// });
app.get('/', (_req, res) => {
  res.send('✅ Multi-tenant backend is running...');
});
// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
