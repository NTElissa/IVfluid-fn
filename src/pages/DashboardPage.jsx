import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, AlertTriangle, Users, Building, Bell, Plus, Activity, ArrowLeft, LogOut, UserPlus, Home } from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("live");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    // Clear localStorage to destroy session
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend, bgColor }) => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-2" style={{ color }}>{value}</p>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          {trend && <p className="text-sm font-semibold text-green-500 mt-1">{trend}</p>}
        </div>
        <div className="p-3 rounded-lg flex items-center justify-center" style={{ backgroundColor: bgColor }}>
          <Icon size={24} color={color} />
        </div>
      </div>
    </div>
  );

  const IVBagStatus = ({ patient, room, hospital, remaining, doctor, nurse, started, estimated, critical = false }) => {
    const progressColor = critical ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-gradient-to-r from-blue-500 to-green-500";
    const statusColor = critical ? "text-red-600" : "text-amber-600";
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className={`flex items-center gap-1 font-medium text-sm ${statusColor}`}>
              <AlertTriangle size={16} />
              {critical ? "CRITICAL" : "WARNING"}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{patient}</h3>
            <p className="text-sm text-gray-500">{room} • {hospital}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{remaining}%</p>
            <p className="text-sm text-gray-500">remaining</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full mb-4 overflow-hidden">
          <div className={`h-full ${progressColor} transition-all`} style={{ width: `${remaining}%` }}></div>
        </div>
        {/* Details Grid */}
        <div className="grid grid-cols-4 gap-4 text-sm">
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
      <div className="p-8">
        {/* Back and Logout Buttons */}
        <div className="flex justify-between mb-8">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-300"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-red-700"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* Title Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Smart IV Monitoring System</h1>
            <p className="text-gray-500 mt-1">Rwanda Healthcare Network</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <Bell size={20} />
              <span>Alerts (2)</span>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700"
              onClick={() => navigate("/iv-registration")}
            >
              <Plus size={20} />
              <span>Register New IV</span>
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-green-700"
              onClick={() => navigate("/patient-registration")}
            >
              <UserPlus size={20} />
              <span>Register New Patient</span>
            </button>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-purple-700"
              onClick={() => navigate("/create-room")}
            >
              <Home size={20} />
              <span>Create New Room</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Active IV Bags" value="12" subtitle="+2 from yesterday" icon={Activity} color="#2563eb" bgColor="#dbeafe" trend="+2 from yesterday" />
          <StatCard title="Critical Alerts" value="1" subtitle="Requires immediate attention" icon={AlertTriangle} color="#dc2626" bgColor="#fef2f2" />
          <StatCard title="Active Staff" value="24" subtitle="8 doctors, 16 nurses" icon={Users} color="#16a34a" bgColor="#f0fdf4" />
          <StatCard title="Connected Facilities" value="5" subtitle="Across Kigali & provinces" icon={Building} color="#ea580c" bgColor="#fff7ed" />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            {["live", "alerts", "registration"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition ${activeTab === tab ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-700"}`}
              >
                {tab === "live" && "Live Monitoring"}
                {tab === "alerts" && "Active Alerts"}
                {tab === "registration" && "IV Registration"}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          {activeTab === "live" && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Current IV Bag Status</h2>
              <p className="text-gray-500 mb-6">Real-time monitoring of all registered IV bags</p>
              <IVBagStatus patient="John Mukama" room="Room 201" hospital="University Teaching Hospital of Kigali (CHUK)" remaining={15} doctor="Dr. Jean Baptiste" nurse="Nurse Alice Ingabire" started="08:30" estimated="14:30" critical={true} />
              <IVBagStatus patient="Grace Uwimana" room="Room 105" hospital="King Faisal Hospital" remaining={25} doctor="Dr. Marie Uwera" nurse="Nurse Paul Nkurunziza" started="09:15" estimated="15:45" critical={false} />
            </div>
          )}
          {activeTab === "registration" && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Register New IV Bag</h2>
              <p className="text-gray-500 mb-6">Enter details to register a new IV bag for monitoring</p>
              <p>IV Registration form will be displayed here. Use the "Register New IV" button to navigate.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p> Last updated: {currentTime.toLocaleTimeString()} | System Status: Online | Connected Devices: 12 </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;