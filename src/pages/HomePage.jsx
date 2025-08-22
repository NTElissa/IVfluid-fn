import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Activity, 
  Shield, 
  Users, 
  Building, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Smartphone,
  Wifi,
  ArrowRight,
  Play,
  Star,
  Menu,
  X
} from 'lucide-react';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const navigate = useNavigate();

  const stats = [
    { number: '500+', label: 'Active Patients', icon: Users },
    { number: '50+', label: 'Healthcare Facilities', icon: Building },
    { number: '99.9%', label: 'System Uptime', icon: Activity },
    { number: '24/7', label: 'Monitoring', icon: Clock }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#0f172a'
    },
    
    // Header Styles
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(30, 41, 59, 0.5)',
      zIndex: 1000,
      padding: '16px 0'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logoText: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
      margin: 0
    },
    logoSubtext: {
      fontSize: '12px',
      color: '#94a3b8',
      margin: 0
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px'
    },
    navLink: {
      color: '#cbd5e1',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'color 0.3s ease',
      cursor: 'pointer'
    },
    navLinkHover: {
      color: '#3b82f6'
    },
    loginBtn: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    
    // Hero Section
    hero: {
      paddingTop: '120px',
      paddingBottom: '80px',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      position: 'relative',
      overflow: 'hidden'
    },
    heroContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      alignItems: 'center'
    },
    heroText: {
      color: 'white'
    },
    heroTitle: {
      fontSize: '48px',
      fontWeight: 'bold',
      lineHeight: '1.2',
      marginBottom: '24px',
      margin: 0
    },
    heroSubtitle: {
      fontSize: '20px',
      color: '#cbd5e1',
      lineHeight: '1.6',
      marginBottom: '32px',
      margin: 0
    },
    heroButtons: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center'
    },
    primaryBtn: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '14px 28px',
      borderRadius: '10px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    secondaryBtn: {
      backgroundColor: 'transparent',
      color: '#cbd5e1',
      padding: '14px 28px',
      borderRadius: '10px',
      border: '2px solid #475569',
      fontSize: '16px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    heroVisual: {
      position: 'relative',
      height: '400px',
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      borderRadius: '16px',
      border: '1px solid rgba(51, 65, 85, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    
    // Stats Section
    stats: {
      backgroundColor: '#1e293b',
      padding: '60px 0'
    },
    statsContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '40px'
    },
    statCard: {
      textAlign: 'center',
      color: 'white'
    },
    statNumber: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#3b82f6',
      marginBottom: '8px',
      margin: 0
    },
    statLabel: {
      fontSize: '16px',
      color: '#cbd5e1',
      margin: 0
    },
    statIcon: {
      marginBottom: '16px',
      display: 'flex',
      justifyContent: 'center'
    },
    
    // Features Section
    features: {
      backgroundColor: '#0f172a',
      padding: '80px 0'
    },
    featuresContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },
    sectionTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: '16px',
      margin: 0
    },
    sectionSubtitle: {
      fontSize: '18px',
      color: '#cbd5e1',
      textAlign: 'center',
      marginBottom: '60px',
      margin: 0
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '32px'
    },
    featureCard: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      padding: '32px',
      borderRadius: '16px',
      border: '1px solid rgba(51, 65, 85, 0.5)',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    featureIcon: {
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'center'
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '12px',
      margin: 0
    },
    featureDescription: {
      fontSize: '16px',
      color: '#cbd5e1',
      lineHeight: '1.6',
      margin: 0
    },
    
    // Benefits Section
    benefits: {
      backgroundColor: '#1e293b',
      padding: '80px 0'
    },
    benefitsContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      alignItems: 'center'
    },
    benefitsList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    benefitItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
      marginBottom: '24px',
      color: 'white'
    },
    benefitText: {
      fontSize: '16px',
      lineHeight: '1.6',
      margin: 0
    },
    benefitTitle: {
      fontWeight: '600',
      marginBottom: '4px'
    },
    
    // CTA Section
    cta: {
      backgroundColor: '#0f172a',
      padding: '80px 0'
    },
    ctaContent: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 24px',
      textAlign: 'center'
    },
    ctaTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '16px',
      margin: 0
    },
    ctaSubtitle: {
      fontSize: '18px',
      color: '#cbd5e1',
      marginBottom: '32px',
      margin: 0
    },
    
    // Footer
    footer: {
      backgroundColor: '#1e293b',
      padding: '40px 0',
      borderTop: '1px solid rgba(51, 65, 85, 0.5)'
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    footerText: {
      color: '#94a3b8',
      fontSize: '14px',
      margin: 0
    },
    footerLinks: {
      display: 'flex',
      gap: '24px'
    },
    footerLink: {
      color: '#cbd5e1',
      textDecoration: 'none',
      fontSize: '14px'
    }
  };

  const features = [
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Continuous monitoring of IV fluid levels with instant alerts when intervention is needed.'
    },
    {
      icon: AlertTriangle,
      title: 'Smart Alerts',
      description: 'Intelligent notification system that alerts medical staff before critical situations occur.'
    },
    {
      icon: Shield,
      title: 'Patient Safety',
      description: 'Enhanced patient safety through automated monitoring and reduced human error.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics and reporting to optimize healthcare delivery and resource allocation.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Access',
      description: 'Access patient data and receive alerts on any device, anywhere in the healthcare facility.'
    },
    {
      icon: Wifi,
      title: 'IoT Integration',
      description: 'Seamless integration with existing hospital systems and IoT infrastructure.'
    }
  ];

  const benefits = [
    'Reduce medical errors by up to 85% with automated monitoring',
    'Improve patient outcomes through proactive care management',
    'Optimize nursing workflow and resource allocation',
    'Decrease medication waste and healthcare costs',
    'Enable data-driven decision making for hospital administrators',
    'Ensure compliance with healthcare standards and regulations'
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <Heart size={32} color="#3b82f6" />
            <div>
              <h1 style={styles.logoText}>SmartIV Monitor</h1>
              <p style={styles.logoSubtext}>Rwanda Healthcare Network</p>
            </div>
          </div>
          
          <nav style={styles.nav}>
            <a href="#features" style={styles.navLink}>Features</a>
            <a href="#benefits" style={styles.navLink}>Benefits</a>
            <a href="#about" style={styles.navLink}>About</a>
            <a href="#contact" style={styles.navLink}>Contact</a>
            <button style={styles.loginBtn} onClick={() => navigate("/login")}   //  go to login page
      >
        Access Dashboard
      </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>
              Revolutionizing IV Fluid Monitoring in Rwanda
            </h1>
            <p style={styles.heroSubtitle}>
              Advanced IoT-powered system that ensures patient safety through real-time IV fluid monitoring, 
              intelligent alerts, and comprehensive healthcare analytics.
            </p>
            <div style={styles.heroButtons}>
              <button style={styles.primaryBtn}>
                <span>Get Started</span>
                <ArrowRight size={20} />
              </button>
              <button style={styles.secondaryBtn}>
                <Play size={20} />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
          
          <div style={styles.heroVisual}>
            <div style={{
              position: 'absolute',
              inset: '20px',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <Activity size={80} color="#3b82f6" />
              <div style={{ textAlign: 'center', color: 'white' }}>
                <p style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Live System Status</p>
                <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0 }}>Monitoring 247 patients across 12 facilities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.stats}>
        <div style={styles.statsContent}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} style={styles.statCard}>
                <div style={styles.statIcon}>
                  <Icon size={32} color="#3b82f6" />
                </div>
                <h3 style={styles.statNumber}>{stat.number}</h3>
                <p style={styles.statLabel}>{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.features}>
        <div style={styles.featuresContent}>
          <h2 style={styles.sectionTitle}>Cutting-Edge Healthcare Technology</h2>
          <p style={styles.sectionSubtitle}>
            Discover how SmartIV Monitor is transforming patient care across Rwanda's healthcare system
          </p>
          
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} style={styles.featureCard}>
                  <div style={styles.featureIcon}>
                    <Icon size={32} color="#3b82f6" />
                  </div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDescription}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" style={styles.benefits}>
        <div style={styles.benefitsContent}>
          <div>
            <h2 style={styles.sectionTitle}>Transforming Healthcare Outcomes</h2>
            <p style={styles.sectionSubtitle}>
              Experience measurable improvements in patient care, operational efficiency, and clinical outcomes
            </p>
            
            <ul style={styles.benefitsList}>
              {benefits.map((benefit, index) => (
                <li key={index} style={styles.benefitItem}>
                  <CheckCircle size={20} color="#22c55e" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <p style={styles.benefitText}>{benefit}</p>
                </li>
              ))}
            </ul>
          </div>
          
          <div style={styles.heroVisual}>
            <div style={{
              position: 'absolute',
              inset: '20px',
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <Shield size={64} color="#22c55e" />
              <div style={{ textAlign: 'center', color: 'white' }}>
                <p style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Patient Safety First</p>
                <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0 }}>99.9% alert accuracy rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Transform Your Healthcare Facility?</h2>
          <p style={styles.ctaSubtitle}>
            Join leading hospitals across Rwanda in delivering safer, more efficient patient care
          </p>
          <div style={styles.heroButtons}>
            <button style={styles.primaryBtn}>
              <span>Start Free Trial</span>
              <ArrowRight size={20} />
            </button>
            <button style={styles.secondaryBtn}>
              <span>Contact Sales</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.logo}>
            <Heart size={24} color="#3b82f6" />
            <div>
              <p style={{...styles.logoText, fontSize: '16px', color: '#cbd5e1'}}>SmartIV Monitor</p>
            </div>
          </div>
          
          <div style={styles.footerLinks}>
            <a href="#" style={styles.footerLink}>Privacy Policy</a>
            <a href="#" style={styles.footerLink}>Terms of Service</a>
            <a href="#" style={styles.footerLink}>Support</a>
          </div>
          
          <p style={styles.footerText}>
            © 2025 SmartIV Monitor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;