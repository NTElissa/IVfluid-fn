// New component: src/components/Pages/PatientRegistration.jsx (create this file)
// Note: Assume you have added backend endpoints for fetching rooms (/rooms), doctors (/users?role=doctor), and nurses (/users?role=nurse).
// If not, implement them similarly to patient routes, e.g., in a userController.js and roomController.js.
// For example, in userRoutes.js: router.get('/', getAllUsers); with query for role.
// In roomRoutes.js: similar for rooms.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api'; // Adjust path based on your structure (the provided api.js)

const PatientRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationalId: '',
    phone: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: '',
    },
    medicalHistory: [],
    allergies: [],
    currentRoom: '',
    admissionDate: new Date().toISOString().split('T')[0],
    attendingDoctor: '',
    assignedNurse: '',
  });

  const [rooms, setRooms] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [newAllergy, setNewAllergy] = useState('');
  const [newHistory, setNewHistory] = useState({ condition: '', diagnosedDate: '', notes: '' });

  useEffect(() => {
    // Fetch necessary data for selects
    const fetchData = async () => {
      try {
        const roomsRes = await api.get('/rooms');
        setRooms(roomsRes.data.data || []);

        const doctorsRes = await api.get('/users', { params: { role: 'doctor' } });
        setDoctors(doctorsRes.data.data || []);

        const nursesRes = await api.get('/users', { params: { role: 'nurse' } });
        setNurses(nursesRes.data.data || []);
      } catch (error) {
        toast.error('Failed to load options');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmergencyChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [name]: value },
    }));
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setFormData((prev) => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()],
      }));
      setNewAllergy('');
    }
  };

  const removeAllergy = (index) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index),
    }));
  };

  const handleHistoryChange = (e) => {
    const { name, value } = e.target;
    setNewHistory((prev) => ({ ...prev, [name]: value }));
  };

  const addHistory = () => {
    if (newHistory.condition.trim()) {
      setFormData((prev) => ({
        ...prev,
        medicalHistory: [...prev.medicalHistory, { ...newHistory }],
      }));
      setNewHistory({ condition: '', diagnosedDate: '', notes: '' });
    }
  };

  const removeHistory = (index) => {
    setFormData((prev) => ({
      ...prev,
      medicalHistory: prev.medicalHistory.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/patients', formData);
      toast.success('Patient registered successfully');
      navigate('/dashboard'); // Or wherever the dashboard is
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-300"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Register New Patient</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">National ID</label>
                  <input
                    type="text"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.emergencyContact.name}
                    onChange={handleEmergencyChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.emergencyContact.phone}
                    onChange={handleEmergencyChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Relationship</label>
                  <input
                    type="text"
                    name="relationship"
                    value={formData.emergencyContact.relationship}
                    onChange={handleEmergencyChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  />
                </div>
              </div>
            </div>

            {/* Medical History Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Medical History</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Condition</label>
                    <input
                      type="text"
                      name="condition"
                      value={newHistory.condition}
                      onChange={handleHistoryChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Diagnosed Date</label>
                    <input
                      type="date"
                      name="diagnosedDate"
                      value={newHistory.diagnosedDate}
                      onChange={handleHistoryChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <input
                      type="text"
                      name="notes"
                      value={newHistory.notes}
                      onChange={handleHistoryChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addHistory}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700"
                >
                  <Plus size={16} />
                  Add Condition
                </button>
                {formData.medicalHistory.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {formData.medicalHistory.map((hist, index) => (
                      <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                        <span>{hist.condition} (Diagnosed: {hist.diagnosedDate || 'N/A'}) - {hist.notes || ''}</span>
                        <button type="button" onClick={() => removeHistory(index)} className="text-red-600 hover:text-red-800">
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Allergies Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Allergies</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  placeholder="Enter allergy"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                />
                <button
                  type="button"
                  onClick={addAllergy}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
              {formData.allergies.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {formData.allergies.map((allergy, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                      <span>{allergy}</span>
                      <button type="button" onClick={() => removeAllergy(index)} className="text-red-600 hover:text-red-800">
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Assignment Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Assignment & Admission</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Room</label>
                  <select
                    name="currentRoom"
                    value={formData.currentRoom}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  >
                    <option value="">Select Room</option>
                    {rooms.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.roomNumber} ({room.roomType}, Floor {room.floor})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Attending Doctor</label>
                  <select
                    name="attendingDoctor"
                    value={formData.attendingDoctor}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        {doc.firstName} {doc.lastName} ({doc.employeeId})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Assigned Nurse</label>
                  <select
                    name="assignedNurse"
                    value={formData.assignedNurse}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  >
                    <option value="">Select Nurse</option>
                    {nurses.map((nurse) => (
                      <option key={nurse._id} value={nurse._id}>
                        {nurse.firstName} {nurse.lastName} ({nurse.employeeId})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Admission Date</label>
                  <input
                    type="date"
                    name="admissionDate"
                    value={formData.admissionDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-green-700"
              >
                <UserPlus size={20} />
                <span>Register Patient</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;