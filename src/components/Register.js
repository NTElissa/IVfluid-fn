import React, { useState } from 'react';
import { 
  Heart, 
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Building,
  Shield,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

const Register = ({ onRegister, onGoToLogin, onBack, mockUsers }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    hospital: '',
    licenseNumber: ''
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
      overflow: 'hidden',
      maxHeight: '90vh',
      overflowY: 'auto'
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
      marginBottom: '20px'
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
    select: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: 'white',
      outline: 'none',
      boxSizing: 'border-box'
    },
    error: {
      color: '#ef4444',
      fontSize: '14px',
      marginTop: '4px',
      margin: 0
    },
    button: {
      width: '100%',
      backgroundColor: '#22c55e',
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
    }
  };

  const validateRegisterForm = () => {
    const newErrors = {};
    
    if (!registerForm.fullName) newErrors.fullName = 'Full name is required';
    if (!registerForm.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!registerForm.password) {
      newErrors.password = 'Password is required';
    } else if (registerForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!registerForm.role) newErrors.role = 'Role is required';
    if (!registerForm.hospital) newErrors.hospital = 'Hospital is required';
    if (!registerForm.licenseNumber) newErrors.licenseNumber = 'License number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Check if user already exists
      const existingUser = mockUsers.find(user => user.email === registerForm.email);
      
      if (existingUser) {
        setErrors({ email: 'User with this email already exists' });
      } else {
        const newUser = {
          email: registerForm.email,
          name: registerForm.fullName,
          role: registerForm.role,
          hospital: registerForm.hospital
        };
        
        onRegister(newUser);
        setErrors({});
      }
      
      setIsLoading(false);
    }, 1500);
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
        <span>Back</span>
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
          <h2 style={styles.headerTitle}>Create Your Account</h2>
          <p style={styles.headerSubtitle}>Join the SmartIV monitoring network</p>
        </div>

        <form style={styles.form} onSubmit={handleRegister}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <div style={styles.inputContainer}>
              <User size={20} style={styles.inputIcon} />
              <input
                type="text"
                style={{
                  ...styles.input,
                  ...styles.inputWithIcon,
                  borderColor: errors.fullName ? '#ef4444' : '#e5e7eb'
                }}
                placeholder="Dr. John Doe"
                value={registerForm.fullName}
                onChange={(e) => setRegisterForm({...registerForm, fullName: e.target.value})}
              />
            </div>
            {errors.fullName && <p style={styles.error}>{errors.fullName}</p>}
          </div>

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
                value={registerForm.email}
                onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
              />
            </div>
            {errors.email && <p style={styles.error}>{errors.email}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Role</label>
            <select
              style={{
                ...styles.select,
                borderColor: errors.role ? '#ef4444' : '#e5e7eb'
              }}
              value={registerForm.role}
              onChange={(e) => setRegisterForm({...registerForm, role: e.target.value})}
            >
              <option value="">Select your role</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Administrator">Administrator</option>
              <option value="Technician">Technician</option>
            </select>
            {errors.role && <p style={styles.error}>{errors.role}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Hospital/Facility</label>
            <div style={styles.inputContainer}>
              <Building size={20} style={styles.inputIcon} />
              <input
                type="text"
                style={{
                  ...styles.input,
                  ...styles.inputWithIcon,
                  borderColor: errors.hospital ? '#ef4444' : '#e5e7eb'
                }}
                placeholder="CHUK Hospital"
                value={registerForm.hospital}
                onChange={(e) => setRegisterForm({...registerForm, hospital: e.target.value})}
              />
            </div>
            {errors.hospital && <p style={styles.error}>{errors.hospital}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>License Number</label>
            <div style={styles.inputContainer}>
              <Shield size={20} style={styles.inputIcon} />
              <input
                type="text"
                style={{
                  ...styles.input,
                  ...styles.inputWithIcon,
                  borderColor: errors.licenseNumber ? '#ef4444' : '#e5e7eb'
                }}
                placeholder="MD123456"
                value={registerForm.licenseNumber}
                onChange={(e) => setRegisterForm({...registerForm, licenseNumber: e.target.value})}
              />
            </div>
            {errors.licenseNumber && <p style={styles.error}>{errors.licenseNumber}</p>}
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
                placeholder="Create a strong password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
              />
              <div style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            {errors.password && <p style={styles.error}>{errors.password}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.inputContainer}>
              <Lock size={20} style={styles.inputIcon} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                style={{
                  ...styles.input,
                  ...styles.inputWithIcon,
                  paddingRight: '44px',
                  borderColor: errors.confirmPassword ? '#ef4444' : '#e5e7eb'
                }}
                placeholder="Confirm your password"
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
              />
              <div style={styles.eyeIcon} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}
          </div>

          <button
            type="button"
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {})
            }}
            disabled={isLoading}
            onClick={handleRegister}
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
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Already have an account? {' '}
            <button style={styles.linkButton} onClick={onGoToLogin}>
              Sign in here
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

export default Register;