import React, { useState, useEffect } from 'react';
import { Heart, Plus } from 'lucide-react';

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
    priority: 'medium'
  });
  const [patients, setPatients] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, rRes, dRes, nRes] = await Promise.all([
          fetch('/api/patients', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}),
          fetch('/api/rooms', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}),
          fetch('/api/users?role=doctor', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}),
          fetch('/api/users?role=nurse', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
        ]);

        setPatients(await pRes.json());
        setRooms(await rRes.json());
        setDoctors(await dRes.json());
        setNurses(await nRes.json());
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/iv-fluids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          totalVolume: parseInt(formData.totalVolume, 10),
          flowRate: parseInt(formData.flowRate, 10),
          status: 'active'
        })
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
        priority: 'medium'
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full border border-gray-100">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Heart size={36} className="text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">SmartIV Monitor</h1>
            <p className="text-sm text-gray-500">Register a new IV Fluid</p>
          </div>
        </div>

        {/* Alerts */}
        {error && <p className="text-red-500 mb-3 bg-red-50 p-2 rounded">{error}</p>}
        {success && <p className="text-green-600 mb-3 bg-green-50 p-2 rounded">{success}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Dropdowns */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
            <select
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              required
            >
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option key={p._id} value={p._id}>{p.firstName} {p.lastName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
            <select
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              required
            >
              <option value="">Select Room</option>
              {rooms.map((r) => (
                <option key={r._id} value={r._id}>Room {r.roomNumber} ({r.roomType})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
            <select
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={formData.assignedDoctor}
              onChange={(e) => setFormData({ ...formData, assignedDoctor: e.target.value })}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>{d.firstName} {d.lastName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nurse</label>
            <select
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={formData.assignedNurse}
              onChange={(e) => setFormData({ ...formData, assignedNurse: e.target.value })}
              required
            >
              <option value="">Select Nurse</option>
              {nurses.map((n) => (
                <option key={n._id} value={n._id}>{n.firstName} {n.lastName}</option>
              ))}
            </select>
          </div>

          {/* Text Inputs */}
          <input
            type="text"
            placeholder="Fluid Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={formData.fluidName}
            onChange={(e) => setFormData({ ...formData, fluidName: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Total Volume (ml)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={formData.totalVolume}
            onChange={(e) => setFormData({ ...formData, totalVolume: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Flow Rate (ml/hr)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={formData.flowRate}
            onChange={(e) => setFormData({ ...formData, flowRate: e.target.value })}
            required
          />

          <input
            type="datetime-local"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 w-full rounded-lg flex items-center justify-center gap-2 text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            <Plus size={20} /> Register IV Fluid
          </button>
        </form>
      </div>
    </div>
  );
};

export default IVRegistration;
