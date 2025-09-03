import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // Add useLocation
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import Dashboard from "./pages/DashboardPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import IVRegistration from "./pages/IVRegistrationPage";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import PatientRegistration from "./pages/PatientRegistration";
import CreateRoom from "./pages/CreateRoomPage";

function App() {
  const location = useLocation(); 

  // Check if the current route is NOT /dashboard
  const showNavbar = !["/dashboard", "/profile","/patient-registration" ,"/iv-registration" ,"/create-room"].includes(location.pathname);
  return (
    <AuthProvider>
      {/* Conditionally render Navbar */}
      {showNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/iv-registration"
          element={
            <ProtectedRoute>
              <IVRegistration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-registration"
          element={<ProtectedRoute>
            <PatientRegistration />
          </ProtectedRoute>}
        />
        <Route
          path="/create-room"
          element={<ProtectedRoute>
            <CreateRoom />
          </ProtectedRoute>}
        />  

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  );
}

export default App;