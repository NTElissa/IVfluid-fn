import React, { useState } from 'react';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { 
  Heart, Eye, EyeOff, User, Mail, Lock, Building, Shield, CheckCircle, Phone, MapPin
} from 'lucide-react';
import { authAPI } from '../services/api';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    employeeId: '', firstName: '', lastName: '', email: '', phone: '',
    password: '', confirmPassword: '', role: '', department: '', hospital: '',
    district: '', province: '', licenseNumber: '', specialization: '', shift: ''
  });
  const [errors, setErrors] = useState({});

  const provinces = ['Kigali City', 'Southern', 'Northern', 'Eastern', 'Western'];
  const roles = ['admin', 'doctor', 'nurse', 'staff'];
  const shifts = ['day', 'night', 'evening'];

  const validateRegisterForm = () => {
    const newErrors = {};
    if (!registerForm.employeeId) newErrors.employeeId = 'Employee ID is required';
    if (!registerForm.firstName) newErrors.firstName = 'First name is required';
    if (!registerForm.lastName) newErrors.lastName = 'Last name is required';
    if (!registerForm.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(registerForm.email)) newErrors.email = 'Email is invalid';
    if (!registerForm.phone) newErrors.phone = 'Phone number is required';
    if (!registerForm.password) newErrors.password = 'Password is required';
    else if (registerForm.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (registerForm.password !== registerForm.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
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
      // Exclude confirmPassword from backend payload
      const { confirmPassword, ...registrationData } = registerForm;

      const response = await authAPI.register(registrationData);

      if (response.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        if (onRegister) onRegister(response.data);
        
      toast.success("Registration successful 🎉");
        navigate('/dashboard');
      } else {
        setErrors({ general: response.message || 'Registration failed' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.data?.message) setErrors({ general: error.response.data.message });
      else if (error.response?.status === 400) setErrors({ general: 'User with this email or employee ID already exists' });
      else toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-5 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 z-50 py-4">
        <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Heart size={32} className="text-blue-500" />
            <div>
              <h1 className="text-white text-2xl font-bold">SmartIV Monitor</h1>
              <p className="text-slate-400 text-xs">Rwanda Healthcare Network</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              onClick={() => navigate('/login')}
            >
              Access Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Registration Form */}
      <div className="flex items-center justify-center pt-32">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Create Your Account</h2>
          <p className="text-gray-500 mb-6 text-center">Join the SmartIV monitoring network</p>

          <form className="space-y-6" onSubmit={handleRegister}>
            {errors.general && (
              <div className="bg-red-100 border border-red-300 rounded-md p-3">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Employee ID */}
            <div>
              <label className="block text-gray-700 font-medium text-sm mb-1">Employee ID</label>
              <div className="relative">
                <Shield size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="EMP001"
                  value={registerForm.employeeId}
                  onChange={(e) => setRegisterForm({...registerForm, employeeId: e.target.value})}
                  disabled={isLoading}
                  className={`w-full pl-10 p-3 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.employeeId ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>}
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium text-sm mb-1">First Name</label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Jean"
                    value={registerForm.firstName}
                    onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                    disabled={isLoading}
                    className={`w-full pl-10 p-3 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium text-sm mb-1">Last Name</label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Uwimana"
                    value={registerForm.lastName}
                    onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                    disabled={isLoading}
                    className={`w-full pl-10 p-3 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium text-sm mb-1">Email</label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  disabled={isLoading}
                  className={`w-full pl-10 p-3 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium text-sm mb-1">Phone</label>
              <div className="relative">
                <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="+250 78 123 4567"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                  disabled={isLoading}
                  className={`w-full pl-10 p-3 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Role & Shift */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium text-sm mb-1">Role</label>
                <select
                  value={registerForm.role}
                  onChange={(e) => setRegisterForm({...registerForm, role: e.target.value})}
                  disabled={isLoading}
                  className={`w-full p-3 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select role</option>
                  {roles.map((role) => <option key={role} value={role}>{role}</option>)}
                </select>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium text-sm mb-1">Shift</label>
                <select
                  value={registerForm.shift}
                  onChange={(e) => setRegisterForm({...registerForm, shift: e.target.value})}
                  disabled={isLoading}
                  className="w-full p-3 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                >
                  <option value="">Select shift</option>
                  {shifts.map((shift) => <option key={shift} value={shift}>{shift}</option>)}
                </select>
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium text-sm mb-1">Password</label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                    disabled={isLoading}
                    className={`w-full pl-10 p-3 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium text-sm mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                    disabled={isLoading}
                    className={`w-full pl-10 p-3 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Hospital & Province */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium text-sm mb-1">Hospital</label>
                <input
                  type="text"
                  placeholder="Hospital Name"
                  value={registerForm.hospital}
                  onChange={(e) => setRegisterForm({...registerForm, hospital: e.target.value})}
                  disabled={isLoading}
                  className={`w-full p-3 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.hospital ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium text-sm mb-1">Province</label>
                <select
                  value={registerForm.province}
                  onChange={(e) => setRegisterForm({...registerForm, province: e.target.value})}
                  disabled={isLoading}
                  className={`w-full p-3 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.province ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select province</option>
                  {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            {/* Department, District, License, Specialization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Department"
                value={registerForm.department}
                onChange={(e) => setRegisterForm({...registerForm, department: e.target.value})}
                className="w-full p-3 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
              <input
                type="text"
                placeholder="District"
                value={registerForm.district}
                onChange={(e) => setRegisterForm({...registerForm, district: e.target.value})}
                className="w-full p-3 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="License Number"
                value={registerForm.licenseNumber}
                onChange={(e) => setRegisterForm({...registerForm, licenseNumber: e.target.value})}
                className="w-full p-3 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
              <input
                type="text"
                placeholder="Specialization"
                value={registerForm.specialization}
                onChange={(e) => setRegisterForm({...registerForm, specialization: e.target.value})}
                className="w-full p-3 border-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center gap-2 p-4 rounded-md font-semibold text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} transition`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Create Account
                </>
              )}
            </button>

            <p className="text-center text-gray-500 mt-4">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="text-blue-500 underline">
                Sign in here
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
