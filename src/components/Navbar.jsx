import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const styles = {
    navContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 24px",
      backgroundColor: "#2563eb", // Blue background
      color: "#fff",
      flexWrap: "wrap",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontWeight: "bold",
      fontSize: "20px",
      color: "#fff",
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "24px",
    },
    link: {
      textDecoration: "none",
      color: "#fff",
      fontWeight: "500",
      fontSize: "14px",
      padding: "8px 0",
      borderBottom: "2px solid transparent",
      transition: "all 0.3s",
    },
    activeLink: {
      borderBottom: "2px solid #fff",
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    userAvatar: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: "#1e40af", // Darker blue circle
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    mobileMenuButton: {
      display: "none",
      cursor: "pointer",
    },
    mobileNavLinks: {
      display: isOpen ? "flex" : "none",
      flexDirection: "column",
      width: "100%",
      marginTop: "12px",
      gap: "12px",
    },
  };

  return (
    <nav style={styles.navContainer}>
      <div style={styles.logo}>IV Fluid App</div>

      {/* Desktop Links */}
      <div style={{ ...styles.navLinks, flex: 1, justifyContent: "center" }} className="desktop-links">
        <Link to="/" style={{ ...styles.link, ...styles.activeLink }}>
          Home
        </Link>
        <Link to="/dashboard" style={styles.link}>
          Dashboard
        </Link>
      </div>

      <div style={styles.userSection}>
        <Bell size={20} color="#fff" />
        <div style={styles.userAvatar}>
          <User size={20} color="#fff" />
        </div>
        {/* Hamburger button for mobile */}
        <div
          style={styles.mobileMenuButton}
          className="mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Links */}
      <div style={styles.mobileNavLinks} className="mobile-links">
        <Link to="/" style={{ ...styles.link, ...styles.activeLink }} onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/dashboard" style={styles.link} onClick={() => setIsOpen(false)}>
          Dashboard
        </Link>
      </div>

      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-links {
              display: none;
            }
            .mobile-menu-button {
              display: flex !important;
            }
          }
          @media (min-width: 769px) {
            .mobile-links {
              display: none !important;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
