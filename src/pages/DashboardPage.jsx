import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  AlertTriangle, 
  Users, 
  Building, 
  Bell,
  Settings,
  User,
  LogOut,
  Plus,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alerts, setAlerts] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
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
      cursor: 'pointer'
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
    },
    main: {
      padding: '32px 24px'
    },
    titleSection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '32px'
    },
    title: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: 0
    },
    subtitle: {
      color: '#64748b',
      marginTop: '4px',
      margin: 0
    },
    titleRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    alertsInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#64748b'
    },
    registerBtn: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      padding: '24px',
      transition: 'box-shadow 0.2s'
    },
    statCardHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    },
    statTitle: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#64748b',
      margin: 0
    },
    statValue: {
      fontSize: '30px',
      fontWeight: 'bold',
      marginTop: '8px',
      margin: 0
    },
    statSubtitle: {
      fontSize: '14px',
      color: '#64748b',
      marginTop: '4px',
      margin: 0
    },
    statTrend: {
      fontSize: '14px',
      color: '#22c55e',
      marginTop: '4px',
      fontWeight: '500',
      margin: 0
    },
    iconContainer: {
      padding: '12px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    tabsContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      marginBottom: '24px'
    },
    tabsList: {
      display: 'flex',
      borderBottom: '1px solid #e2e8f0'
    },
    tab: {
      padding: '16px 24px',
      fontSize: '14px',
      fontWeight: '500',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      borderBottom: '2px solid transparent'
    },
    tabActive: {
      color: '#2563eb',
      borderBottom: '2px solid #2563eb'
    },
    tabInactive: {
      color: '#64748b'
    },
    monitoringSection: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      padding: '24px'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: 0,
      marginBottom: '8px'
    },
    sectionSubtitle: {
      color: '#64748b',
      marginBottom: '24px',
      margin: 0
    },
    ivBagCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      padding: '24px',
      marginBottom: '16px'
    },
    ivBagHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    statusBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '4px'
    },
    patientName: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1e293b',
      margin: 0
    },
    patientInfo: {
      fontSize: '14px',
      color: '#64748b',
      margin: 0
    },
    remainingContainer: {
      textAlign: 'right'
    },
    remainingPercent: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: 0
    },
    remainingText: {
      fontSize: '14px',
      color: '#64748b',
      margin: 0
    },
    progressBar: {
      width: '100%',
      height: '12px',
      backgroundColor: '#e2e8f0',
      borderRadius: '6px',
      marginBottom: '16px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      borderRadius: '6px',
      transition: 'width 0.3s ease'
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      fontSize: '14px'
    },
    detailLabel: {
      color: '#64748b',
      marginBottom: '4px',
      margin: 0
    },
    detailValue: {
      fontWeight: '500',
      color: '#1e293b',
      margin: 0
    },
    footer: {
      marginTop: '32px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#64748b'
    }
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend, bgColor }) => (
    <div style={styles.statCard}>
      <div style={styles.statCardHeader}>
        <div>
          <p style={styles.statTitle}>{title}</p>
          <p style={{...styles.statValue, color: color}}>{value}</p>
          <p style={styles.statSubtitle}>{subtitle}</p>
          {trend && (
            <p style={styles.statTrend}>{trend}</p>
          )}
        </div>
        <div style={{...styles.iconContainer, backgroundColor: bgColor}}>
          <Icon size={24} color={color} />
        </div>
      </div>
    </div>
  );

  const IVBagStatus = ({ patient, room, hospital, remaining, doctor, nurse, started, estimated, critical = false }) => {
    const progressColor = critical 
      ? 'linear-gradient(to right, #ef4444, #dc2626)' 
      : 'linear-gradient(to right, #3b82f6, #22c55e)';
    
    const statusColor = critical ? '#dc2626' : '#d97706';

    return (
      <div style={styles.ivBagCard}>
        <div style={styles.ivBagHeader}>
          <div>
            <div style={{...styles.statusBadge, color: statusColor}}>
              <AlertTriangle size={16} />
              {critical ? 'CRITICAL' : 'WARNING'}
            </div>
            <h3 style={styles.patientName}>{patient}</h3>
            <p style={styles.patientInfo}>{room} • {hospital}</p>
          </div>
          <div style={styles.remainingContainer}>
            <p style={styles.remainingPercent}>{remaining}%</p>
            <p style={styles.remainingText}>remaining</p>
          </div>
        </div>
        
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${remaining}%`,
              background: progressColor
            }}
          ></div>
        </div>

        <div style={styles.detailsGrid}>
          <div>
            <p style={styles.detailLabel}>Doctor:</p>
            <p style={styles.detailValue}>{doctor}</p>
          </div>
          <div>
            <p style={styles.detailLabel}>Nurse:</p>
            <p style={styles.detailValue}>{nurse}</p>
          </div>
          <div>
            <p style={styles.detailLabel}>Started:</p>
            <p style={styles.detailValue}>{started}</p>
          </div>
          <div>
            <p style={styles.detailLabel}>Est. Complete:</p>
            <p style={styles.detailValue}>{estimated}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Header */}
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
          <a href="#" style={{...styles.navLink, ...styles.navLinkActive}}>Live Dashboard</a>
          <a href="#" style={styles.navLink}>IV Registration</a>
          <a href="#" style={styles.navLink}>Rwanda Case Study</a>
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

      <div style={styles.main}>
        {/* Title Section */}
        <div style={styles.titleSection}>
          <div>
            <h1 style={styles.title}>Smart IV Monitoring System</h1>
            <p style={styles.subtitle}>Rwanda Healthcare Network</p>
          </div>
          <div style={styles.titleRight}>
            <div style={styles.alertsInfo}>
              <Bell size={20} />
              <span>Alerts (2)</span>
            </div>
            <button style={styles.registerBtn}>
              <Plus size={20} />
              <span>Register New IV</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <StatCard
            title="Active IV Bags"
            value="12"
            subtitle="+2 from yesterday"
            icon={Activity}
            color="#2563eb"
            bgColor="#dbeafe"
            trend="+2 from yesterday"
          />
          <StatCard
            title="Critical Alerts"
            value="1"
            subtitle="Requires immediate attention"
            icon={AlertTriangle}
            color="#dc2626"
            bgColor="#fef2f2"
          />
          <StatCard
            title="Active Staff"
            value="24"
            subtitle="8 doctors, 16 nurses"
            icon={Users}
            color="#16a34a"
            bgColor="#f0fdf4"
          />
          <StatCard
            title="Connected Facilities"
            value="5"
            subtitle="Across Kigali & provinces"
            icon={Building}
            color="#ea580c"
            bgColor="#fff7ed"
          />
        </div>

        {/* Tabs */}
        <div style={styles.tabsContainer}>
          <div style={styles.tabsList}>
            <button style={{...styles.tab, ...styles.tabActive}}>
              Live Monitoring
            </button>
            <button style={{...styles.tab, ...styles.tabInactive}}>
              Active Alerts
            </button>
            <button style={{...styles.tab, ...styles.tabInactive}}>
              IV Registration
            </button>
          </div>
        </div>

        {/* IV Monitoring Section */}
        <div style={styles.monitoringSection}>
          <div>
            <h2 style={styles.sectionTitle}>Current IV Bag Status</h2>
            <p style={styles.sectionSubtitle}>Real-time monitoring of all registered IV bags</p>
          </div>

          <div>
            <IVBagStatus
              patient="John Mukama"
              room="Room 201"
              hospital="University Teaching Hospital of Kigali (CHUK)"
              remaining={15}
              doctor="Dr. Jean Baptiste"
              nurse="Nurse Alice Ingabire"
              started="08:30"
              estimated="14:30"
              critical={true}
            />
            
            <IVBagStatus
              patient="Grace Uwimana"
              room="Room 105"
              hospital="King Faisal Hospital"
              remaining={25}
              doctor="Dr. Marie Uwera"
              nurse="Nurse Paul Nkurunziza"
              started="09:15"
              estimated="15:45"
              critical={false}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p>Last updated: {currentTime.toLocaleTimeString()} | System Status: Online | Connected Devices: 12</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;