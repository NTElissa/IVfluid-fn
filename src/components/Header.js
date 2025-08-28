import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, Bell, Settings, User } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
   const alerts = 3;

  const styles = {
    header: {
      backgroundColor: 'white',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e2e8f0',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    logoText: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: 0
    },
    logoSubtext: {
      fontSize: '14px',
      color: '#64748b',
      margin: 0
    },
    iotStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#dcfce7',
      color: '#166534',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '500'
    },
    iotDot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#22c55e',
      borderRadius: '50%'
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px'
    },
    navLink: {
      color: '#64748b',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '500',
      padding: '8px 0',
      borderBottom: '2px solid transparent',
      cursor: 'pointer',
      background: 'none',
      border: 'none'
    },
    navLinkActive: {
      color: '#1e293b',
      borderBottom: '2px solid #2563eb'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    bellContainer: {
      position: 'relative',
      cursor: 'pointer'
    },
    alertBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      backgroundColor: '#ef4444',
      color: 'white',
      fontSize: '12px',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    userText: {
      textAlign: 'right'
    },
    userName: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#1e293b',
      margin: 0
    },
    userHospital: {
      fontSize: '12px',
      color: '#64748b',
      margin: 0
    },
    userAvatar: {
      width: '32px',
      height: '32px',
      backgroundColor: '#f1f5f9',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerLeft}>
        <div style={styles.logo}>
          <Heart size={32} color="#2563eb" />
          <div>
            <h1 style={styles.logoText}>SmartIV Monitor</h1>
            <p style={styles.logoSubtext}>Rwanda Healthcare Network</p>
          </div>
        </div>
        <div style={styles.iotStatus}>
          <div style={styles.iotDot}></div>
          IoT Connected
        </div>
      </div>
      
      <nav style={styles.nav}>
        <Link to="/" style={{...styles.navLink, ...(location.pathname === '/' ? styles.navLinkActive : {})}}>
          Live Dashboard
        </Link>
        <Link to="/iv-registration" style={{...styles.navLink, ...(location.pathname === '/iv-registration' ? styles.navLinkActive : {})}}>
          IV Registration
        </Link>
        <Link to="/case-study" style={styles.navLink}>
          Rwanda Case Study
        </Link>
      </nav>

      <div style={styles.headerRight}>
        <div style={styles.bellContainer}>
          <Bell size={24} color="#64748b" />
          <span style={styles.alertBadge}>{alerts}</span>
        </div>
        <Settings size={24} color="#64748b" />
        <div style={styles.userInfo}>
          <div style={styles.userText}>
            <p style={styles.userName}>Dr. Jean Baptiste</p>
            <p style={styles.userHospital}>CHUK Hospital</p>
          </div>
          <div style={styles.userAvatar}>
            <User size={20} color="#64748b" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;