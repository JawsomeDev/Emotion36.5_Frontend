import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ isLoginMode: true });

  const toggleMode = () => {
    setAuthState((prev) => ({
      ...prev,
      isLoginMode: !prev.isLoginMode,
    }));
  };

  return (
    <AuthContext.Provider value={{ ...authState, toggleMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);