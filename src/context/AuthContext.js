import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const { data } = await api.post("/users/login", { email, password });
    if (data.success) {
      localStorage.setItem("token", data.data.token);
      setUser(data.data);
    }
    return data;
  };

  const register = async (formData) => {
    const { data } = await api.post("/users/register", formData);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/users/profile");
      setUser(data.data);
    } catch {
      logout();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
