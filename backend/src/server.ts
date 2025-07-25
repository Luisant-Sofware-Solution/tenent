import express from 'express';
import cors from 'cors';

// Route imports
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/category.routes';
import taxRoutes from './routes/tax.routes';
import unitRoutes from './routes/unit.routes';
import productRoutes from './routes/product.routes';
import salesRoutes from './routes/sales.routes';
import companyRoutes from './routes/company.routes';
import customerRoutes from './routes/customer.routes';
import superAdminRoutes from './routes/superadmin.routes';

const app = express();

// ✅ Enable CORS
app.use(cors({
  origin: 'http://localhost:3001', // Frontend origin
  credentials: true, // Optional: needed for cookies/auth headers
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/taxes', taxRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api', companyRoutes); // Watch for route overlap
app.use('/api/superadmin', superAdminRoutes);

// ✅ Start server
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
