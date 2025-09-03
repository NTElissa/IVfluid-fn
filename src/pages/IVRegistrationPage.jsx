import React, { useState, useEffect } from 'react';
import { Heart, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IVRegistration = () => {
  const [formData, setFormData] = useState({
    patient: '',
    room: '',
    assignedDoctor: '',
    assignedNurse: '',
    fluidType: '',
    fluidName: '',
    concentration: '',
    totalVolume: '',
    flowRate: '',
    startTime: '',
    priority: 'medium',
  });
  const [patients, setPatients] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, rRes, dRes, nRes] = await Promise.all([
          fetch('/api/patients', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
          fetch('/api/rooms', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
          fetch('/api/users?role=doctor', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
          fetch('/api/users?role=nurse', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
        ]);

        if (!pRes.ok || !rRes.ok || !dRes.ok || !nRes.ok) {
          throw new Error('Failed to fetch data');
        }

        setPatients(await pRes.json());
        setRooms(await rRes.json());
        setDoctors(await dRes.json());
        setNurses(await nRes.json());
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic form validation
    if (!formData.fluidName || !formData.totalVolume || !formData.flowRate || !formData.startTime) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/iv-fluids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...formData,
          totalVolume: parseInt(formData.totalVolume, 10),
          flowRate: parseInt(formData.flowRate, 10),
          status: 'active',
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to register IV fluid');

      setSuccess('✅ IV fluid registered successfully!');
      setFormData({
        patient: '',
        room: '',
        assignedDoctor: '',
        assignedNurse: '',
        fluidType: '',
        fluidName: '',
        concentration: '',
        totalVolume: '',
        flowRate: '',
        startTime: '',
        priority: 'medium',
      });
    } catch (err) {
      setError(err.message || 'An error occurred while registering the IV fluid.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full border border-gray-200">
        {/* Back Button */}
        <button
          className="mb-6 flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Heart size={36} className="text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">SmartIV Monitor</h1>
            <p className="text-sm text-gray-500">Register a new IV fluid administration</p>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg flex items-center gap-2">
            <span>{success}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
              <select
                name="patient"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
                value={formData.patient}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Patient</option>
                {patients.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.firstName} {p.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
              <select
                name="room"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
                value={formData.room}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Room</option>
                {rooms.map((r) => (
                  <option key={r._id} value={r._id}>
                    Room {r.roomNumber} ({r.roomType})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
              <select
                name="assignedDoctor"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
                value={formData.assignedDoctor}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.firstName} {d.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nurse</label>
              <select
                name="assignedNurse"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
                value={formData.assignedNurse}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Nurse</option>
                {nurses.map((n) => (
                  <option key={n._id} value={n._id}>
                    {n.firstName} {n.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Text Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fluid Name</label>
              <input
                type="text"
                name="fluidName"
                placeholder="Fluid Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
                value={formData.fluidName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Concentration</label>
              <input
                type="text"
                name="concentration"
                placeholder="Concentration (e.g., 0.9%)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
                value={formData.concentration}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Volume (ml)</label>
              <input
                type="number"
                name="totalVolume"
                placeholder="Total Volume (ml)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
                value={formData.totalVolume}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Flow Rate (ml/hr)</label>
              <input
                type="number"
                name="flowRate"
                placeholder="Flow Rate (ml/hr)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
                value={formData.flowRate}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
              value={formData.startTime}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 w-full rounded-lg flex items-center justify-center gap-2 text-lg font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            <Plus size={20} />
            Register IV Fluid
          </button>
        </form>
      </div>
    </div>
  );
};

export default IVRegistration;