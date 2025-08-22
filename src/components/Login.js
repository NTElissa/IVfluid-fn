import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { authAPI } from '../services/api';

const Login = ({ onLogin, onBack }) => {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const styles = {
    container: {
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    },
    backButton: {
      position: 'absolute',
      top: '24px',
      left: '24px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)'
    },
    authCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      width: '100%',
      maxWidth: '480px',
      overflow: 'hidden'
    },
    header: {
      backgroundColor: '#1e293b',
      padding: '32px',
      textAlign: 'center',
      color: 'white'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '16px'
    },
    logoText: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: 0
    },
    logoSubtext: {
      fontSize: '14px',
      color: '#94a3b8',
      margin: 0
    },
    headerTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '8px',
      margin: 0
    },
    headerSubtitle: {
      color: '#cbd5e1',
      fontSize: '14px',
      margin: 0
    },
    form: {
      padding: '32px'
    },
    formGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px',
      margin: 0
    },
    inputContainer: {
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'border-color 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box'
    },
    inputWithIcon: {
      paddingLeft: '44px'
    },
    inputIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af'
    },
    eyeIcon: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      cursor: 'pointer'
    },
    error: {
      color: '#ef4444',
      fontSize: '14px',
      marginTop: '4px',
      margin: 0
    },
    button: {
      width: '100%',
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '14px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'background-color 0.3s ease',
      marginBottom: '24px'
    },
    buttonDisabled: {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed'
    },
    linkButton: {
      background: 'none',
      border: 'none',
      color: '#3b82f6',
      cursor: 'pointer',
      textDecoration: 'underline',
      fontSize: '14px'
    },
    footer: {
      textAlign: 'center',
      padding: '24px 32px',
      backgroundColor: '#f8fafc',
      borderTop: '1px solid #e5e7eb'
    },
    footerText: {
      color: '#6b7280',
      fontSize: '14px',
      margin: 0
    },
    successMessage: {
      backgroundColor: '#dcfce7',
      border: '1px solid #bbf7d0',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '16px'
    },
    errorMessage: {
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '16px'
    }
  };

  const validateLoginForm = () => {
    const newErrors = {};
    
    if (!loginForm.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!loginForm.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await authAPI.login({
        email: loginForm.email,
        password: loginForm.password
      });

      if (response.success) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        
        // Call onLogin callback if provided
        if (onLogin) {
          onLogin(response.data);
        }
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setErrors({ general: response.message || 'Login failed' });
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else if (error.response?.status === 401) {
        setErrors({ general: 'Invalid email or password' });
      } else {
        setErrors({ general: 'Network error. Please check your connection and try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.backButton}
        onClick={onBack}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </button>

      <div style={styles.authCard}>
        <div style={styles.header}>
          <div style={styles.logo}>
            <Heart size={32} color="#3b82f6" />
            <div>
              <h1 style={styles.logoText}>SmartIV Monitor</h1>
              <p style={styles.logoSubtext}>Rwanda Healthcare Network</p>
            </div>
          </div>
          <h2 style={styles.headerTitle}>Healthcare Professional Login</h2>
          <p style={styles.headerSubtitle}>Access your patient monitoring dashboard</p>
        </div>

        <div style={styles.form}>
          {errors.general && (
            <div style={styles.errorMessage}>
              <p style={styles.error}>{errors.general}</p>
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputContainer}>
                <Mail size={20} style={styles.inputIcon} />
                <input
                  type="email"
                  style={{
                    ...styles.input,
                    ...styles.inputWithIcon,
                    borderColor: errors.email ? '#ef4444' : '#e5e7eb'
                  }}
                  placeholder="doctor@hospital.rw"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p style={styles.error}>{errors.email}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputContainer}>
                <Lock size={20} style={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  style={{
                    ...styles.input,
                    ...styles.inputWithIcon,
                    paddingRight: '44px',
                    borderColor: errors.password ? '#ef4444' : '#e5e7eb'
                  }}
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  disabled={isLoading}
                />
                <div style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
              {errors.password && <p style={styles.error}>{errors.password}</p>}
            </div>

            <button
              type="submit"
              style={{
                ...styles.button,
                ...(isLoading ? styles.buttonDisabled : {})
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #ffffff40',
                    borderTop: '2px solid #ffffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don't have an account? {' '}
            <button style={styles.linkButton} onClick={() => navigate('/register')}>
              Sign up here
            </button>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;