import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoginMode: true,
    user: null,
    loading: true, // ✅ 로딩 상태 추가
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuthState({
        isLoginMode: false,
        user: JSON.parse(storedUser),
        loading: false,
      });
    } else {
      setAuthState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const toggleMode = () => {
    setAuthState((prev) => ({
      ...prev,
      isLoginMode: !prev.isLoginMode,
    }));
  };

  const loginContext = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthState({
      isLoginMode: false,
      user: userData,
      loading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuthState({
      isLoginMode: true,
      user: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, toggleMode, loginContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);