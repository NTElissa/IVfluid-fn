import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import api from "../services/api";

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    floor: "",
    department: "",
    hospital: "",
    capacity: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/admin/rooms", formData);
      if (response.data.success) {
        toast.success("Room created successfully 🎉");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating room");
    } finally {
      setLoading(false);
    }
  };

  const roomTypes = ["ICU", "Emergency", "General", "Pediatric", "Maternity", "Surgery"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl border border-gray-200 p-6 sm:p-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          🏥 Create New Room
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Room Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Room Number
            </label>
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter room number"
              required
            />
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Room Type
            </label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Room Type</option>
              {roomTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Floor */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Floor
            </label>
            <input
              type="number"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter floor number"
              required
              min="0"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., Cardiology"
              required
            />
          </div>

          {/* Hospital */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Hospital
            </label>
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter hospital name"
              required
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Number of beds"
              required
              min="1"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Room"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomPage;
