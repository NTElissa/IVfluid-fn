import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#282c34",
        color: "#fff",
      }}
    >
      <h2>IV Fluid App</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
