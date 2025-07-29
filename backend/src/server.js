"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// ✅ Load environment variables from .env file
dotenv_1.default.config();
// ✅ Initialize express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// ✅ Middleware
app.use((0, cors_1.default)({ origin: true, credentials: true })); // CORS config
app.use(express_1.default.json()); // ✅ Parse JSON body
app.use(express_1.default.urlencoded({ extended: true })); // ✅ Optional, for forms
// ✅ Import routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const tax_routes_1 = __importDefault(require("./routes/tax.routes"));
const unit_routes_1 = __importDefault(require("./routes/unit.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const sales_routes_1 = __importDefault(require("./routes/sales.routes"));
const superadmin_routes_1 = __importDefault(require("./routes/superadmin.routes"));
const company_routes_1 = __importDefault(require("./routes/company.routes"));
// ✅ Route setup
app.use('/api/users', user_routes_1.default);
app.use('/api/categories', category_routes_1.default);
app.use('/api/units', unit_routes_1.default);
app.use('/api/taxes', tax_routes_1.default);
app.use('/api/products', product_routes_1.default);
app.use('/api/sales', sales_routes_1.default);
app.use('/api/superadmin', superadmin_routes_1.default);
app.use('/api', company_routes_1.default); // This makes /api/companies available
app.get('/', (_req, res) => {
    res.send('✅ Server is running');
});
// ✅ Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
