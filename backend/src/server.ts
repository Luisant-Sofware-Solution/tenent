import express from 'express';
import userRoutes from './routes/user.routes'; // adjust path if needed
import categoryRoutes from './routes/category.routes';
import taxRoutes from './routes/tax.routes';
import unitRoutes from './routes/unit.routes';
import productRoutes from './routes/product.routes';
import salesRoutes from './routes/sales.routes';
import { createCustomer } from './controllers/customer.controller';
import companyRoutes from './routes/company.routes';
import customerRoutes from './routes/customer.routes';
import superAdminRoutes from './routes/superadmin.routes';
const app = express();
app.use(express.json());

// Example: All user routes will be under /api/users
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/taxes', taxRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
// Add other routes as needed
app.use('/api/customers', customerRoutes);
app.use('/api', companyRoutes);
// Example for creating a customer
app.post('/api/customers', createCustomer);
app.use('/api/superadmin', superAdminRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
