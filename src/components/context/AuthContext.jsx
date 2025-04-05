// src/components/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoginMode: true,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // ⬇️ 새로고침 시 localStorage에서 사용자 정보 복구
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuthState({
        isLoginMode: false,
        user: JSON.parse(storedUser),
      });
    }
  }, []);

  const toggleMode = () => {
    setAuthState((prev) => ({
      ...prev,
      isLoginMode: !prev.isLoginMode,
    }));
  };

  const loginContext = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // ⬅️ 저장
    setAuthState({
      isLoginMode: false,
      user: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuthState({
      isLoginMode: true,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, toggleMode, loginContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
