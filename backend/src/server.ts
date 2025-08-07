import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Route Imports
import companyRoutes from './routes/company.routes';
import superAdminRoutes from './routes/superadmin.routes';
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/category.routes';
import unitRoutes from './routes/unit.routes';
import taxRoutes from './routes/tax.routes';
import { login } from './controllers/auth.controller';
import productRoutes from './routes/product.routes';
import salesRoutes from './routes/sales.routes';
import { authenticate } from "./middleware/auth.middleware"
// import { getUsers } from './controllers/user.controller';
import { createCompany,getCompanies,getCompanyById,deleteCompanyById, patchCompanyById, } from './controllers/company.controller';
import {  getAllUsers, updateUser,deleteUser, createUser } from './controllers/user.controller';
import { createCategory, deleteCategory, getAllCategories,  updateCategory } from './controllers/category.controller';
import { loginUser } from './controllers/login.controller';


// ✅ Health check
app.get('/', (_req, res) => {
  res.send('✅ Multi-tenant backend is running...');
});

// ✅ Mount Routes
app.post('/api/login', login);

app.use('/api/companies', companyRoutes);
companyRoutes.post('/',createCompany)
companyRoutes.get('/',getCompanies)
companyRoutes.get('/:id', getCompanyById)
companyRoutes.delete('/:id', deleteCompanyById)
companyRoutes.patch('/:id', patchCompanyById);
companyRoutes.post('/login', login)
console.log('✅ companyRoutes mounted at /api/companies');



// ✅ Mount Routes users
app.use('/api/users', userRoutes);
userRoutes.post('/login', loginUser)
userRoutes.post('/',createUser)
userRoutes.get('/',getAllUsers)
userRoutes.patch('/:id',updateUser)
userRoutes.delete('/:id',deleteUser)

// ✅ Mount Routes categories
app.use('/api/categories',categoryRoutes)
console.log('✅ categoryRoutes mounted at /api/category');
categoryRoutes.post("/", createCategory)
categoryRoutes.get("/", getAllCategories)
// categoryRoutes.get('/:companyId/:id', getCategory)
categoryRoutes.put("/:id", updateCategory)
categoryRoutes.delete("/:id", deleteCategory);

app.use('/api/superadmin', superAdminRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/taxes', taxRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);

// ❌ 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
