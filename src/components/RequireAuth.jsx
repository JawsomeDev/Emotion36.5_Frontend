// src/components/auth/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const toastShownRef = useRef(false);

  useEffect(() => {
    if (!user && !loading && !toastShownRef.current) {
      toast.warn("로그인이 필요합니다.");
      toastShownRef.current = true;
    }
  }, [user, loading]);

  if (loading) {
    return <div className="text-center mt-20 text-gray-500">로딩 중...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
