import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, AlertTriangle, Users, Building, Bell, Plus, Activity, ArrowLeft, LogOut, UserPlus, Home } from "lucide-react";
import toast from "react-hot-toast";
import { authAPI } from "../services/api"; // Import authAPI from api.js

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("live");
  const [patients, setPatients] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // State to store user info

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        setUser(response.data); // Assuming the response contains user data
      } catch (error) {
        toast.error("Failed to fetch user profile");
      }
    };
    fetchUserProfile();

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeTab === "patients") {
      fetchPatients();
    } else if (activeTab === "rooms") {
      fetchRooms();
    }
  }, [activeTab]);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/patients", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPatients(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/admin/rooms", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRooms(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend, bgColor }) => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-500">{title}</p>
          <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2" style={{ color }}>{value}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">{subtitle}</p>
          {trend && <p className="text-xs sm:text-sm font-semibold text-green-500 mt-1">{trend}</p>}
        </div>
        <div className="p-2 sm:p-3 rounded-lg flex items-center justify-center" style={{ backgroundColor: bgColor }}>
          <Icon size={16} className="sm:w-6 sm:h-6" color={color} />
        </div>
      </div>
    </div>
  );

  const IVBagStatus = ({ patient, room, hospital, remaining, doctor, nurse, started, estimated, critical = false }) => {
    const progressColor = critical ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-gradient-to-r from-blue-500 to-green-500";
    const statusColor = critical ? "text-red-600" : "text-amber-600";
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-4">
        <div className="flex flex-col sm:flex-row items-start justify-between mb-2 sm:mb-4">
          <div>
            <div className={`flex items-center gap-1 font-medium text-xs sm:text-sm ${statusColor}`}>
              <AlertTriangle size={12} className="sm:w-4 sm:h-4" />
              {critical ? "CRITICAL" : "WARNING"}
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">{patient}</h3>
            <p className="text-xs sm:text-sm text-gray-500">{room} • {hospital}</p>
          </div>
          <div className="text-right mt-2 sm:mt-0">
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{remaining}%</p>
            <p className="text-xs sm:text-sm text-gray-500">remaining</p>
          </div>
        </div>
        <div className="w-full h-2 sm:h-3 bg-gray-200 rounded-full mb-2 sm:mb-4 overflow-hidden">
          <div className={`h-full ${progressColor} transition-all`} style={{ width: `${remaining}%` }}></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
          <div>
            <p className="text-gray-500">Doctor:</p>
            <p className="font-medium text-gray-900">{doctor}</p>
          </div>
          <div>
            <p className="text-gray-500">Nurse:</p>
            <p className="font-medium text-gray-900">{nurse}</p>
          </div>
          <div>
            <p className="text-gray-500">Started:</p>
            <p className="font-medium text-gray-900">{started}</p>
          </div>
          <div>
            <p className="text-gray-500">Est. Complete:</p>
            <p className="font-medium text-gray-900">{estimated}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="p-4 sm:p-8">
        {/* User Info Section */}
        {user && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-4 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Welcome, {user.firstName} {user.lastName}</h2>
            <p className="text-gray-500 text-sm sm:text-base">Role: {user.role}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-8">
          <button
            className="bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg font-medium flex items-center gap-1 sm:gap-2 hover:bg-gray-300 mb-2 sm:mb-0 w-full sm:w-auto"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-base">Back</span>
          </button>
          <button
            className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium flex items-center gap-1 sm:gap-2 hover:bg-red-700 w-full sm:w-auto"
            onClick={handleLogout}
          >
            <LogOut size={16} className="sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-base">Logout</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Smart IV Monitoring System</h1>
            <p className="text-gray-500 text-xs sm:text-base mt-1">Rwanda Healthcare Network</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-4 sm:mt-0">
            <div className="flex items-center gap-1 sm:gap-2 text-gray-500">
              <Bell size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-base">Alerts (2)</span>
            </div>
            <button
              className="bg-blue-600 text-white px-2 sm:px-4 py-2 rounded-lg font-medium flex items-center gap-1 sm:gap-2 hover:bg-blue-700 w-full sm:w-auto"
              onClick={() => navigate("/iv-registration")}
            >
              <Plus size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-base">Register New IV</span>
            </button>
            <button
              className="bg-green-600 text-white px-2 sm:px-4 py-2 rounded-lg font-medium flex items-center gap-1 sm:gap-2 hover:bg-green-700 w-full sm:w-auto"
              onClick={() => navigate("/patient-registration")}
            >
              <UserPlus size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-base">Register New Patient</span>
            </button>
            <button
              className="bg-purple-600 text-white px-2 sm:px-4 py-2 rounded-lg font-medium flex items-center gap-1 sm:gap-2 hover:bg-purple-700 w-full sm:w-auto"
              onClick={() => navigate("/create-room")}
            >
              <Home size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-base">Create New Room</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-8">
          <StatCard title="Active IV Bags" value="12" subtitle="+2 from yesterday" icon={Activity} color="#2563eb" bgColor="#dbeafe" trend="+2 from yesterday" />
          <StatCard title="Critical Alerts" value="1" subtitle="Requires immediate attention" icon={AlertTriangle} color="#dc2626" bgColor="#fef2f2" />
          <StatCard title="Active Staff" value="24" subtitle="8 doctors, 16 nurses" icon={Users} color="#16a34a" bgColor="#f0fdf4" />
          <StatCard title="Connected Facilities" value="5" subtitle="Across Kigali & provinces" icon={Building} color="#ea580c" bgColor="#fff7ed" />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row border-b border-gray-200">
            {["live", "alerts", "registration", "patients", "rooms"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition ${activeTab === tab ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-700"} w-full sm:w-auto`}
              >
                {tab === "live" && "Live Monitoring"}
                {tab === "alerts" && "Active Alerts"}
                {tab === "registration" && "IV Registration"}
                {tab === "patients" && "Patient List"}
                {tab === "rooms" && "Room List"}
              </button>
            ))}
          </div>
          {activeTab === "live" && (
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-1">Current IV Bag Status</h2>
              <p className="text-gray-500 text-xs sm:text-base mb-4 sm:mb-6">Real-time monitoring of all registered IV bags</p>
              <IVBagStatus patient="John Mukama" room="Room 201" hospital="University Teaching Hospital of Kigali (CHUK)" remaining={15} doctor="Dr. Jean Baptiste" nurse="Nurse Alice Ingabire" started="08:30" estimated="14:30" critical={true} />
              <IVBagStatus patient="Grace Uwimana" room="Room 105" hospital="King Faisal Hospital" remaining={25} doctor="Dr. Marie Uwera" nurse="Nurse Paul Nkurunziza" started="09:15" estimated="15:45" critical={false} />
            </div>
          )}
          {activeTab === "alerts" && (
            <div className="p-4 sm:p-6">
              {/* Existing alerts content or placeholder */}
              <p>Active alerts will be displayed here.</p>
            </div>
          )}
          {activeTab === "registration" && (
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-1">Register New IV Bag</h2>
              <p className="text-gray-500 text-xs sm:text-base mb-4 sm:mb-6">Enter details to register a new IV bag for monitoring</p>
              <p>IV Registration form will be displayed here. Use the "Register New IV" button to navigate.</p>
            </div>
          )}
          {activeTab === "patients" && (
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-1">Patient List</h2>
              <p className="text-gray-500 text-xs sm:text-base mb-4 sm:mb-6">List of all registered patients</p>
              {loading ? (
                <p className="text-center text-xs sm:text-base">Loading...</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">Patient ID</th>
                        <th className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">Name</th>
                        <th className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">Age</th>
                        <th className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">Room</th>
                        <th className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient) => (
                        <tr key={patient._id} className="hover:bg-gray-50">
                          <td className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">{patient.patientId}</td>
                          <td className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">{`${patient.firstName} ${patient.lastName}`}</td>
                          <td className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">{patient.age}</td>
                          <td className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">{patient.currentRoom?.roomNumber || "N/A"}</td>
                          <td className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">{patient.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          {activeTab === "rooms" && (
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-1">Room List</h2>
              <p className="text-gray-500 text-xs sm:text-base mb-4 sm:mb-6">List of all registered rooms</p>
              {loading ? (
                <p className="text-center text-xs sm:text-base">Loading...</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">Room Number</th>
                        <th className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">Type</th>
                        <th className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">Floor</th>
                        <th className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">Department</th>
                        <th className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">Hospital</th>
                        <th className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">Capacity</th>
                        <th className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">Occupancy</th>
                        <th className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">Assigned Staff</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms.map((room) => (
                        <tr key={room._id} className="hover:bg-gray-50">
                          <td className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">{room.roomNumber}</td>
                          <td className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">{room.roomType}</td>
                          <td className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">{room.floor}</td>
                          <td className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">{room.department}</td>
                          <td className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">{room.hospital}</td>
                          <td className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">{room.capacity}</td>
                          <td className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">{room.currentOccupancy}</td>
                          <td className="py-1 sm:py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">
                            {room.assignedStaff
                              .map((staff) => `${staff.user.firstName} ${staff.user.lastName} (${staff.role})`)
                              .join(", ") || "None"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-center text-xs sm:text-sm text-gray-500 mt-4 sm:mt-8">
          <p> Last updated: {currentTime.toLocaleTimeString()} | System Status: Online | Connected Devices: 12 </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;