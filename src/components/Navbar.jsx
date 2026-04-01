import React from "react";
import { Link, useLocation } from "react-router-dom";


function Navbar() {
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const isScan = location.pathname === "/scan";

  return (
    <nav className="navbar">
      <div className="logo">AI Refrigerator</div>

      <div className="nav-links">
        <Link to="/" className={isDashboard ? "active" : ""}>Dashboard</Link>
        <Link to="/scan" className={isScan ? "active" : ""}>Scan Product</Link>
      </div>

      <Link to="/scan" className="add-btn">+ Add Item</Link>
    </nav>
  );
}

export default Navbar;
