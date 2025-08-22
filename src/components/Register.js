import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  ArrowLeft,
  Phone,
  MapPin
} from 'lucide-react';
import { authAPI } from '../services/api';

const Register = ({ onRegister, onBack }) => {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    department: '',
    hospital: '',
    district: '',
    province: '',
    licenseNumber: '',
    specialization: '',
    shift: ''
  });
  const [errors, setErrors] = useState({});

  const provinces = ['Kigali City', 'Southern', 'Northern', 'Eastern', 'Western'];
  const roles = ['admin', 'doctor', 'nurse', 'staff'];
  const shifts = ['day', 'night', 'evening'];

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
      maxWidth: '600px',
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
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '20px'
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

  const validateRegisterForm = () => {
    const newErrors = {};
    
    if (!registerForm.employeeId) newErrors.employeeId = 'Employee ID is required';
    if (!registerForm.firstName) newErrors.firstName = 'First name is required';
    if (!registerForm.lastName) newErrors.lastName = 'Last name is required';
    if (!registerForm.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!registerForm.phone) newErrors.phone = 'Phone number is required';
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
    if (!registerForm.province) newErrors.province = 'Province is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Prepare data for backend (excluding confirmPassword)
      const { confirmPassword, ...registrationData } = registerForm;
      
      const response = await authAPI.register(registrationData);

      if (response.success) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        
        // Call onRegister callback if provided
        if (onRegister) {
          onRegister(response.data);
        }
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setErrors({ general: response.message || 'Registration failed' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else if (error.response?.status === 400) {
        setErrors({ general: 'User with this email or employee ID already exists' });
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
          {errors.general && (
            <div style={styles.errorMessage}>
              <p style={styles.error}>{errors.general}</p>
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Employee ID</label>
            <div style={styles.inputContainer}>
              <Shield size={20} style={styles.inputIcon} />
              <input
                type="text"
                style={{
                  ...styles.input,
                  ...styles.inputWithIcon,
                  borderColor: errors.employeeId ? '#ef4444' : '#e5e7eb'
                }}
                placeholder="EMP001"
                value={registerForm.employeeId}
                onChange={(e) => setRegisterForm({...registerForm, employeeId: e.target.value})}
                disabled={isLoading}
              />
            </div>
            {errors.employeeId && <p style={styles.error}>{errors.employeeId}</p>}
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>First Name</label>
              <div style={styles.inputContainer}>
                <User size={20} style={styles.inputIcon} />
                <input
                  type="text"
                  style={{
                    ...styles.input,
                    ...styles.inputWithIcon,
                    borderColor: errors.firstName ? '#ef4444' : '#e5e7eb'
                  }}
                  placeholder="Jean"
                  value={registerForm.firstName}
                  onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                  disabled={isLoading}
                />
              </div>
              {errors.firstName && <p style={styles.error}>{errors.firstName}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Last Name</label>
              <div style={styles.inputContainer}>
                <User size={20} style={styles.inputIcon} />
                <input
                  type="text"
                  style={{
                    ...styles.input,
                    ...styles.inputWithIcon,
                    borderColor: errors.lastName ? '#ef4444' : '#e5e7eb'
                  }}
                  placeholder="Uwimana"
                  value={registerForm.lastName}
                  onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                  disabled={isLoading}
                />
              </div>
              {errors.lastName && <p style={styles.error}>{errors.lastName}</p>}
            </div>
          </div>

          <div style={styles.formRow}>
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
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p style={styles.error}>{errors.email}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number</label>
              <div style={styles.inputContainer}>
                <Phone size={20} style={styles.inputIcon} />
                <input
                  type="tel"
                  style={{
                    ...styles.input,
                    ...styles.inputWithIcon,
                    borderColor: errors.phone ? '#ef4444' : '#e5e7eb'
                  }}
                  placeholder="+250788123456"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                  disabled={isLoading}
                />
              </div>
              {errors.phone && <p style={styles.error}>{errors.phone}</p>}
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Role</label>
              <select
                style={{
                  ...styles.select,
                  borderColor: errors.role ? '#ef4444' : '#e5e7eb'
                }}
                value={registerForm.role}
                onChange={(e) => setRegisterForm({...registerForm, role: e.target.value})}
                disabled={isLoading}
              >
                <option value="">Select your role</option>
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
              {errors.role && <p style={styles.error}>{errors.role}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Department</label>
              <div style={styles.inputContainer}>
                <Building size={20} style={styles.inputIcon} />
                <input
                  type="text"
                  style={{
                    ...styles.input,
                    ...styles.inputWithIcon,
                    borderColor: errors.department ? '#ef4444' : '#e5e7eb'
                  }}
                  placeholder="Cardiology"
                  value={registerForm.department}
                  onChange={(e) => setRegisterForm({...registerForm, department: e.target.value})}
                  disabled={isLoading}
                />
              </div>
              {errors.department && <p style={styles.error}>{errors.department}</p>}
            </div>
          </div>

          <div style={styles.formRow}>
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
                  disabled={isLoading}
                />
              </div>
              {errors.hospital && <p style={styles.error}>{errors.hospital}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>District</label>
              <div style={styles.inputContainer}>
                <MapPin size={20} style={styles.inputIcon} />
                <input
                  type="text"
                  style={{
                    ...styles.input,
                    ...styles.inputWithIcon,
                    borderColor: errors.district ? '#ef4444' : '#e5e7eb'
                  }}
                  placeholder="Nyarugenge"
                  value={registerForm.district}
                  onChange={(e) => setRegisterForm({...registerForm, district: e.target.value})}
                  disabled={isLoading}
                />
              </div>
              {errors.district && <p style={styles.error}>{errors.district}</p>}
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Province</label>
              <select
                style={{
                  ...styles.select,
                  borderColor: errors.province ? '#ef4444' : '#e5e7eb'
                }}
                value={registerForm.province}
                onChange={(e) => setRegisterForm({...registerForm, province: e.target.value})}
                disabled={isLoading}
              >
                <option value="">Select province</option>
                {provinces.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
              {errors.province && <p style={styles.error}>{errors.province}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>License Number (Optional)</label>
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
                  disabled={isLoading}
                />
              </div>
              {errors.licenseNumber && <p style={styles.error}>{errors.licenseNumber}</p>}
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Specialization (Optional)</label>
              <div style={styles.inputContainer}>
                <User size={20} style={styles.inputIcon} />
                <input
                  type="text"
                  style={{
                    ...styles.input,
                    ...styles.inputWithIcon,
                    borderColor: errors.specialization ? '#ef4444' : '#e5e7eb'
                  }}
                  placeholder="General Medicine"
                  value={registerForm.specialization}
                  onChange={(e) => setRegisterForm({...registerForm, specialization: e.target.value})}
                  disabled={isLoading}
                />
              </div>
              {errors.specialization && <p style={styles.error}>{errors.specialization}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Shift (Optional)</label>
              <select
                style={{
                  ...styles.select,
                  borderColor: errors.shift ? '#ef4444' : '#e5e7eb'
                }}
                value={registerForm.shift}
                onChange={(e) => setRegisterForm({...registerForm, shift: e.target.value})}
                disabled={isLoading}
              >
                <option value="">Select shift</option>
                {shifts.map(shift => (
                  <option key={shift} value={shift}>
                    {shift.charAt(0).toUpperCase() + shift.slice(1)}
                  </option>
                ))}
              </select>
              {errors.shift && <p style={styles.error}>{errors.shift}</p>}
            </div>
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
              <div style={styles.eyeIcon} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}
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
            <button style={styles.linkButton} onClick={() => navigate('/login')}>
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
        
        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;