// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// ✅ Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// ✅ Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Middleware
app.use(cors({ origin: true, credentials: true })); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse form data (optional)

// ✅ Route Imports
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/category.routes';
import taxRoutes from './routes/tax.routes';
import unitRoutes from './routes/unit.routes';
import productRoutes from './routes/product.routes';
import salesRoutes from './routes/sales.routes';
import superAdminRoutes from './routes/superadmin.routes';
import companyRoutes from './routes/company.routes';

// ✅ Route Setup
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/taxes', taxRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/superadmin', superAdminRoutes);
app.use('/api', companyRoutes); // handles /api/companies POST and GET
// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
