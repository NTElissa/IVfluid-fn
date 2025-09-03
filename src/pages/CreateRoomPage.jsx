import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Save , Plus} from "lucide-react";
import toast from "react-hot-toast";

const CreateRoom = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hospital: "",
    department: "",
    roomNumber: "",
    roomType: "",
    capacity: "",
    assignedStaff: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStaffChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStaff = [...formData.assignedStaff];
    updatedStaff[index] = { ...updatedStaff[index], [name]: value };
    setFormData((prev) => ({ ...prev, assignedStaff: updatedStaff }));
  };

  const addStaffMember = () => {
    setFormData((prev) => ({
      ...prev,
      assignedStaff: [...prev.assignedStaff, { user: "", role: "" }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/admin/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Room created successfully");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Failed to create room");
      }
    } catch (error) {
      toast.error("Error creating room");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="p-8">
        {/* Back Button */}
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-300 mb-6"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        {/* Title Section */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Room</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hospital</label>
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Room Type</option>
                <option value="general">General</option>
                <option value="icu">ICU</option>
                <option value="surgery">Surgery</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Assigned Staff */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Staff</label>
            {formData.assignedStaff.map((staff, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="user"
                  value={staff.user}
                  onChange={(e) => handleStaffChange(index, e)}
                  placeholder="Staff ID or Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <select
                  name="role"
                  value={staff.role}
                  onChange={(e) => handleStaffChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                </select>
              </div>
            ))}
            <button
              type="button"
              onClick={addStaffMember}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-300"
            >
              <Plus size={20} />
              <span>Add Staff Member</span>
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-purple-700"
          >
            <Save size={20} />
            <span>Save Room</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;