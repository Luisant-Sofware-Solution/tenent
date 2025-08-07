import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlus,
  FaBuilding,
  FaUserPlus,
  FaUsers,
  FaTools,
  FaBoxOpen,
  FaThList,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "./SuperAdminHome.scss";

const SuperAdminHome = () => {
  const [masterOpen, setMasterOpen] = useState(false);

  return (
    <div className="superadmin-container">
      <aside className="sidebar">
        <h3>SuperAdmin</h3>
        <nav>
          <NavLink to="dashboard">
            <FaTachometerAlt style={{ marginRight: "8px" }} />
            Dashboard
          </NavLink>

          <NavLink to="create-company">
            <FaPlus style={{ marginRight: "8px" }} />
            Create Company
          </NavLink>

          <NavLink to="company-list">
            <FaBuilding style={{ marginRight: "8px" }} />
            Company List
          </NavLink>

          <NavLink to="user-form">
            <FaUserPlus style={{ marginRight: "8px" }} />
            User Form
          </NavLink>

          <NavLink to="user-list">
            <FaUsers style={{ marginRight: "8px" }} />
            User List
          </NavLink>

          <div className={`dropdown ${masterOpen ? "open" : ""}`}>
            <div className="dropdown-toggle" onClick={() => setMasterOpen(!masterOpen)}>
              <FaTools style={{ marginRight: "8px" }} />
              Master
              {masterOpen ? (
                <FaChevronUp style={{ marginLeft: "auto" }} />
              ) : (
                <FaChevronDown style={{ marginLeft: "auto" }} />
              )}
            </div>

            {masterOpen && (
              <div className="dropdown-menu">
                <NavLink to="product-creation">
                  <FaBoxOpen style={{ marginRight: "8px" }} />
                  Product Creation
                </NavLink>
                <NavLink to="category-manager">
                  <FaThList style={{ marginRight: "8px" }} />
                  Category Manager
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default SuperAdminHome;
