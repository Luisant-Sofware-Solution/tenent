"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes")); // adjust path if needed
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const tax_routes_1 = __importDefault(require("./routes/tax.routes"));
const unit_routes_1 = __importDefault(require("./routes/unit.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const sales_routes_1 = __importDefault(require("./routes/sales.routes"));
// import { createCustomer } from './controllers/customer.controller';
const company_routes_1 = __importDefault(require("./routes/company.routes"));
const customer_routes_1 = __importDefault(require("./routes/customer.routes"));
const superadmin_routes_1 = __importDefault(require("./routes/superadmin.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Example: All user routes will be under /api/users
app.use('/api/users', user_routes_1.default);
app.use('/api/categories', category_routes_1.default);
app.use('/api/units', unit_routes_1.default);
app.use('/api/taxes', tax_routes_1.default);
app.use('/api/products', product_routes_1.default);
app.use('/api/sales', sales_routes_1.default);
// // Add other routes as needed
app.use('/api/customers', customer_routes_1.default);
app.use('/api', company_routes_1.default);
// // Example for creating a customer
// app.post('/api/customers', createCustomer);
app.use('/api/superadmin', superadmin_routes_1.default);
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
