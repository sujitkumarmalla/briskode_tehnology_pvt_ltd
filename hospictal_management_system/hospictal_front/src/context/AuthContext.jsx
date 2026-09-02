import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("hospital_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("hospital_token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      if (token) {
        try {
          const res = await API.get("/auth/me");
          if (res.data.success) {
            setUser(res.data.user);
            localStorage.setItem("hospital_user", JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.error("Auth check failed:", err.message);
          logout();
        }
      }
      setLoading(false);
    };
    fetchMe();
  }, [token]);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    if (res.data.success) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("hospital_token", res.data.token);
      localStorage.setItem("hospital_user", JSON.stringify(res.data.user));
      return res.data;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("hospital_token");
    localStorage.removeItem("hospital_user");
  };

  const updateProfileState = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("hospital_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, role: user?.role, loading, login, logout, updateProfileState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
