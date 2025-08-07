import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// SuperAdmin Pages
import Login from "./components/SuperAdmin/Login/Login";
import Register from "./components/SuperAdmin/Register/Register";
import Dashboard from "./components/SuperAdmin/Dashboard/Dashboard";
import SuperAdminHome from "./components/SuperAdmin/SuperAdminHome/SuperAdminHome";

// Company Management
import CreateCompany from "./components/Company/Created company/CreateCompany";
import CompanyList from "./components/Company/CompanyList/CompanyList";

// User Management
import UserForm from "./components/Userform/UserForm";
import UserList from "./components/Userform/UserList";

// Master Management
import ProductCreation from "./components/Master/product/ProductCreation";
import CategoryManager from "./components/Category/CategoryManager";

const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedCompanyId = localStorage.getItem("companyId");
    const storedTenantId = localStorage.getItem("tenantId");

    if (storedToken) setToken(storedToken);
    if (storedCompanyId) setCompanyId(Number(storedCompanyId));
    if (storedTenantId) setTenantId(storedTenantId);
  }, []);

  return (
    <Router>
      <Routes>
        {/* SuperAdmin Auth */}
        <Route path="/superadmin/login" element={<Login />} />
        <Route path="/superadmin/register" element={<Register />} />

        {/* SuperAdmin Dashboard and Layout */}
        <Route path="/" element={<SuperAdminHome />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="create-company"
            element={
              <CreateCompany setCompanyId={setCompanyId} setToken={setToken} />
            }
          />
          <Route path="company-list" element={<CompanyList />} />

          {/* User and Master routes only when selected */}
          {companyId && tenantId && (
            <>
              <Route
                path="user-form"
                element={
                  <UserForm
                    companyId={companyId}
                    tenantId={tenantId}
                    onSuccess={() => console.log("✅ User created")}
                  />
                }
              />
              <Route
                path="user-list"
                element={<UserList tenantId={tenantId} />}
              />
              <Route
                path="product-creation"
                element={
                  <ProductCreation
                    companyId={companyId}
                    tenantId={tenantId}
                  />
                }
              />
              <Route
                path="category-manager"
                element={
                  <CategoryManager
                    companyId={companyId}
                    tenantId={tenantId}
                  />
                }
              />
            </>
          )}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
